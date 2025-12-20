declare global {
  interface ImportMetaEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly BASE_URL: string
    readonly DEV: boolean
    readonly PROD: boolean
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
