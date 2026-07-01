import { create } from 'zustand'
import { supabase } from '../supabase-client.js'

async function fetchAvatarUrl(userId) {
  try {
    const { data, error } = await supabase
      .from('usuario')
      .select('avatar_url')
      .eq('id', userId)
      .maybeSingle()

    if (error) throw error

    return data?.avatar_url ?? null
  } catch (error) {
    console.error('Error al cargar el avatar del usuario:', error.message)
    return null
  }
}

async function loadUserSession(set, session) {
  const avatarUrl = session?.user ? await fetchAvatarUrl(session.user.id) : null

  set({
    user: session?.user ?? null,
    isLoggedIn: !!session?.user,
    avatar_url: avatarUrl,
    loading: false,
    error: null,
  })
}

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  error: null,
  user: null,
  avatar_url: null,
  loading: true,

  login: async (email, password) => {
    set({ loading: true, error: null })

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      const avatarUrl = await fetchAvatarUrl(data.user.id)

      set({
        user: data.user,
        error: null,
        isLoggedIn: true,
        avatar_url: avatarUrl,
        loading: false,
      })

      return { success: true, error: null }
    } catch (error) {
      set({
        error: error.message,
        user: null,
        isLoggedIn: false,
        avatar_url: null,
        loading: false,
      })
      return { success: false, error: error.message }
    }
  },

  signUp: async (email, password, extraData = {}) => {
    set({ loading: true, error: null })

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: extraData,
        },
      })

      if (error) throw error

      set({
        user: data.session?.user ?? data.user ?? null,
        isLoggedIn: !!data.session?.user,
        error: null,
        loading: false,
      })

      return { success: true, error: null, user: data.user ?? null }
    } catch (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }
  },

  logOut: async () => {
    set({ loading: true, error: null })

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      set({ user: null, isLoggedIn: false, avatar_url: null, loading: false, error: null })
      return { success: true, error: null }
    } catch (error) {
      set({ loading: false, error: error.message })
      return { success: false, error: error.message }
    }
  },

  initializeAuth: async () => {
    set({ loading: true, error: null })

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) throw error

      await loadUserSession(set, session)

      supabase.auth.onAuthStateChange(async (_event, nextSession) => {
        await loadUserSession(set, nextSession)
      })
    } catch (error) {
      set({
        user: null,
        isLoggedIn: false,
        avatar_url: null,
        loading: false,
        error: error.message,
      })
    }
  },

  getAuth: async () => {
    await useAuthStore.getState().initializeAuth()
  },

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}))