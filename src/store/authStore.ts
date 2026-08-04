import { create } from 'zustand'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../supabase-client.js'

interface UsuarioAvatarRow {
  avatar_url: string | null
}

interface AuthState {
  isLoggedIn: boolean
  error: string | null
  user: User | null
  avatar_url: string | null
  loading: boolean
}

interface AuthResponse {
  success: boolean
  error: string | null
  user?: User | null
}

interface AuthActions {
  login: (email: string, password: string) => Promise<AuthResponse>
  signUp: (email: string, password: string, extraData?: Record<string, unknown>) => Promise<AuthResponse>
  logOut: () => Promise<AuthResponse>
  initializeAuth: () => Promise<void>
}

type AuthStore = AuthState & AuthActions

let authSubscription: { unsubscribe: () => void } | null = null

async function fetchAvatarUrl(userId: string) {
  try {
    const { data, error } = await supabase
      .from('usuario')
      .select('avatar_url')
      .eq('id', userId)
      .maybeSingle<UsuarioAvatarRow>()

    if (error) throw error

    return data?.avatar_url ?? null
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Error al cargar el avatar del usuario:', message)
    return null
  }
}

async function loadUserSession(set: (partial: Partial<AuthState>) => void, session: Session | null) {
  const avatarUrl = session?.user ? await fetchAvatarUrl(session.user.id) : null

  set({
    user: session?.user ?? null,
    isLoggedIn: !!session?.user,
    avatar_url: avatarUrl,
    loading: false,
    error: null,
  })
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isLoggedIn: false,
  error: null,
  user: null,
  avatar_url: null,
  loading: true,

  login: async (email: string, password: string) => {
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
        error: error instanceof Error ? error.message : String(error),
        user: null,
        isLoggedIn: false,
        avatar_url: null,
        loading: false,
      })
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      }
    }
  },

  signUp: async (email: string, password: string, extraData: Record<string, unknown> = {}) => {
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
      const message = error instanceof Error ? error.message : String(error)
      set({ error: message, loading: false })
      return { success: false, error: message }
    }
  },

  logOut: async () => {
    set({ loading: true, error: null })

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      if (authSubscription) {
        authSubscription.unsubscribe()
        authSubscription = null
      }

      set({ user: null, isLoggedIn: false, avatar_url: null, loading: false, error: null })
      return { success: true, error: null }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      set({ loading: false, error: message })
      return { success: false, error: message }
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

      if (authSubscription) {
        authSubscription.unsubscribe()
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
        await loadUserSession(set, nextSession)
      })

      authSubscription = subscription
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      set({
        user: null,
        isLoggedIn: false,
        avatar_url: null,
        loading: false,
        error: message,
      })
    }
  },
}))