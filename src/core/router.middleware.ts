import fr from "@/config/file-routing";
import { generateRoutes, walkTree } from "@/lib/fr";
import { getHandlers, getMethodKey, isHandler } from "@/utils/routing-handlers";
import path from "path";

const CJS_MAIN_FILENAME =
  typeof require !== "undefined" && require.main?.filename;

const PROJECT_DIRECTORY = CJS_MAIN_FILENAME
  ? path.dirname(CJS_MAIN_FILENAME)
  : process.cwd();

const createRouter = async <T extends ExpressLike = ExpressLike>(
  app: T,
  options: Options = {},
): Promise<T> => {
  const files = walkTree(
    options.directory || path.join(PROJECT_DIRECTORY, "routes"),
  );

  const routes = await generateRoutes(files);

  for (const { url, exports } of routes) {
    const exportedMethods = Object.entries(exports);

    for (const [method, handler] of exportedMethods) {
      const methodKey = getMethodKey(method);
      const handlers = getHandlers(handler);

      if (
        !options.additionalMethods?.includes(methodKey) &&
        !fr.DEFAULT_METHOD_EXPORTS.includes(methodKey)
      )
        continue;

      app[methodKey](url, ...handlers);
    }

    if (typeof exports.default !== "undefined") {
      if (isHandler(exports.default)) {
        app.all.apply(app, [url, ...getHandlers(exports.default)]);
      } else if (
        typeof exports.default === "object" &&
        isHandler(exports.default.default)
      ) {
        app.all.apply(app, [url, ...getHandlers(exports.default.default)]);
      }
    }
  }

  return app;
};

export default createRouter;
