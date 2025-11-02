// Fix: Comment out to resolve "Cannot find type definition file for 'vite/client'" in a constrained environment.
// The interfaces below provide the necessary types for import.meta.env for this project.
// /// <reference types="vite/client" />

// Fix: Add process type for process.env.API_KEY used in geminiService.ts, as per guidelines.
declare const process: {
  env: {
    API_KEY: string;
  };
};

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
