/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DEV_TO_API_KEY: string;
  readonly HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
