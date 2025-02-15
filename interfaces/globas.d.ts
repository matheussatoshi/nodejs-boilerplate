declare global {
  export type OnStart = {
    applicationName: string;
    version: string;
    description: string;
    applicationPort: number;
  };
}

export {};
