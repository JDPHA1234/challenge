import { create } from 'zustand'
import { supabase } from '../supabase-client.js'

export const useAuthStore = create((set) => ({
  // estado
  isLoggedIn: false,
  errorlogin: null,
  user: null,
  avatar_url: null,
  loading: true,

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      set({ error: error.message, user: null, isLoggedIn: false, loading: false })
      return { success: false, error: error.message }
    } else {
      const query = await supabase.from('usuario').select('avatar_url').eq('id', data.user.id).single()
      set({ user: data.user, error: null, isLoggedIn: true, avatar_url: query.data.avatar_url || null, loading: false })
      return { success: true, error: null }
    }
  },
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: extraData
      }
    })
    if (error) {
      set({ error: error.message, loading: false })
    } else {
      set({ user: data.user, error: null, loading: false })
    }
  },
  logOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isLoggedIn: false, avatar_url: null });
  },
  initializeAuth: async () => {
  
  const { data: { session } } = await supabase.auth.getSession();
  
  let avatarUrl = null;

  if (session?.user) {
    const { data: userData, error } = await supabase
      .from('usuario')
      .select('avatar_url')
      .eq('id', session.user.id)
      .single();
      
    if (!error && userData) {
      avatarUrl = userData.avatar_url;
    }
  }

  // Actualizamos el estado inicial
  set({ 
    user: session?.user ?? null, 
    isLoggedIn: !!session?.user, 
    avatar_url: avatarUrl,
    loading: false 
  });

  supabase.auth.onAuthStateChange(async (_event, session) => {
    let newAvatarUrl = null;

    if (session?.user) {
      const { data: userData, error } = await supabase
        .from('usuario')
        .select('avatar_url')
        .eq('id', session.user.id)
        .single();
        
      if (!error && userData) {
        newAvatarUrl = userData.avatar_url;
      }
    }

    set({ 
      user: session?.user ?? null, 
      isLoggedIn: !!session?.user, 
      avatar_url: newAvatarUrl,
      loading: false 
    });
  });
},

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),



}))