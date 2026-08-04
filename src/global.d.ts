declare module '*.css'
declare module '*.module.css'
declare module '*.svg'

interface ImportMetaEnv {
  VITE_SUPABASE_URL : string
  VITE_SUPABASE_ANON_KEY : string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
