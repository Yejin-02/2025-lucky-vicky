interface ImportMetaEnv {
  readonly VITE_DOMAIN: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
