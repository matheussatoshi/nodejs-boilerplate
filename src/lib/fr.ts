import { readdirSync, statSync } from "fs";
import path from "path";

import {
  buildRoutePath,
  buildRouteUrl,
  calculatePriority,
  isCjs,
  isFileIgnored,
  mergePaths,
  prioritizeRoutes,
} from "@/utils/routing-handlers";

const IS_ESM = !isCjs();

const MODULE_IMPORT_PREFIX = IS_ESM ? "file://" : "";

export const walkTree = (directory: string, tree: string[] = []) => {
  const results: File[] = [];

  for (const fileName of readdirSync(directory)) {
    const filePath = path.join(directory, fileName);
    const fileStats = statSync(filePath);

    if (fileStats.isDirectory()) {
      results.push(...walkTree(filePath, [...tree, fileName]));
    } else {
      results.push({
        name: fileName,
        path: directory,
        rel: mergePaths(...tree, fileName),
      } as any);
    }
  }

  return results;
};

export const generateRoutes = async (files: File[]) => {
  const routes: Route[] = [];

  for (const file of files) {
    const parsedFile = path.parse(file.rel);

    if (isFileIgnored(parsedFile)) continue;

    const routePath = buildRoutePath(parsedFile);
    const url = buildRouteUrl(routePath);
    const priority = calculatePriority(url);
    const exports = await import(
      MODULE_IMPORT_PREFIX + path.join(file.path, file.name)
    );

    routes.push({
      url,
      priority,
      exports,
    });
  }

  return prioritizeRoutes(routes);
};
