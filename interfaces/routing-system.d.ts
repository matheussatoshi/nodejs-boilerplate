declare global {
  import type { Express, Handler, Router } from "express";

  export type ExpressLike = Express | Router;

  export interface Options {
    directory?: string;
    additionalMethods?: string[];
  }

  export interface File {
    name: string;
    path: string;
    rel: string;
  }

  type MethodExport = Handler | Handler[];

  interface MethodExports {
    get?: MethodExport;
    post?: MethodExport;
    put?: MethodExport;
    patch?: MethodExport;
    delete?: MethodExport;
    head?: MethodExport;
    connect?: MethodExport;
    options?: MethodExport;
    trace?: MethodExport;

    [x: string]: MethodExport | undefined;
  }

  type Exports = MethodExports & {
    default?: any;
  };

  export interface Route {
    url: string;
    priority: number;
    exports: Exports;
  }
}

export {};
