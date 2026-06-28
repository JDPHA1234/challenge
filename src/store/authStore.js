import {create} from 'zustand'
import { supabase } from '../supabase-client.js'

export const useAuthStore = create((set)=> ({
    // estado
    isLoggedIn: false,
    errorlogin: null,
    user: null,

    login : async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      set({ error: error.message, user: null, isLoggedIn: false })
      return { success: false, error: error.message }
    } else {
      set({ user: data.user, error: null, isLoggedIn: true })
        return { success: true, error: null }
    }
  },
    signUp : async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: extraData 
      }
    })
    if (error) {
      set({ error: error.message })
    } else {
      set({ user: data.user, error: null })
    }},
    logOut: async () => {
    await supabase.auth.signOut()
    set({ user: null },
    set({isLoggedIn : false})
    )
}



}))