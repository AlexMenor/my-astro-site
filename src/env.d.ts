/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DEV_TO_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
