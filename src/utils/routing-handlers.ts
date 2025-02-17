import fr from "@/config/file-routing";
import type { Handler } from "express";
import type { ParsedPath } from "path";

export const isCjs = () => typeof module !== "undefined" && !!module?.exports;

export const isFileIgnored = (parsedFile: ParsedPath) =>
  !fr.VALID_FILE_EXTENSIONS.includes(parsedFile.ext.toLowerCase()) ||
  fr.INVALID_NAME_SUFFIXES.some((suffix) =>
    parsedFile.base.toLowerCase().endsWith(suffix),
  ) ||
  parsedFile.name.startsWith(fr.IGNORE_PREFIX_CHAR) ||
  parsedFile.dir.startsWith(`/${fr.IGNORE_PREFIX_CHAR}`);

export const isHandler = (handler: unknown): handler is Handler | Handler[] =>
  typeof handler === "function" || Array.isArray(handler);

export const prioritizeRoutes = (routes: Route[]) =>
  routes.sort((a, b) => a.priority - b.priority);

export const mergePaths = (...paths: string[]) =>
  "/" +
  paths
    .map((path) => path.replace(/^\/|\/$/g, ""))
    .filter((path) => path !== "")
    .join("/");

const regBackets = /\[([^}]*)\]/g;

const transformBrackets = (value: string) =>
  regBackets.test(value) ? value.replace(regBackets, (_, s) => `:${s}`) : value;

export const convertParamSyntax = (path: string) => {
  const subpaths: string[] = [];

  for (const subpath of path.split("/")) {
    subpaths.push(transformBrackets(subpath));
  }

  return mergePaths(...subpaths);
};

export const convertCatchallSyntax = (url: string) =>
  url.replace(/:\.\.\.\w+/g, "*");

export const buildRoutePath = (parsedFile: ParsedPath) => {
  const directory = parsedFile.dir === parsedFile.root ? "" : parsedFile.dir;
  const name = parsedFile.name.startsWith("index")
    ? parsedFile.name.replace("index", "")
    : `/${parsedFile.name}`;

  return directory + name;
};

export const buildRouteUrl = (path: string) => {
  const url = convertParamSyntax(path);
  return convertCatchallSyntax(url);
};

export const calculatePriority = (url: string) => {
  const depth = url.match(/\/.+?/g)?.length || 0;
  const specifity = url.match(/\/:.+?/g)?.length || 0;
  //@ts-ignore
  const catchall = url.match(/\/\*/g)?.length > 0 ? Infinity : 0;

  return depth + specifity + catchall;
};

export const getHandlers = (handler: Handler | Handler[]): Handler[] => {
  if (!Array.isArray(handler)) return [handler];
  return handler;
};

export const getMethodKey = (method: string) => {
  const methodKey = method.toLowerCase();

  if (methodKey === "DELETE") return "delete";

  return methodKey;
};
