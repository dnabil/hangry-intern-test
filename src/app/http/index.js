import http from "http";
import config from "../../config/index.js";
import routes from "./routes.js";
import url from "url";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  const path = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  req.query = {};
  for (const key in query) {
    req.query[key] = query[key];
  }

  let handler = routes[path] && routes[path][method];

  // check dynamic handler
  if (!handler) {
    const routeKeys = Object.keys(routes).filter((key) => key.includes(":"));

    const matchedKey = routeKeys.find((key) => {
      // replacing each segment of the key that starts with a colon (:)
      const regex = new RegExp(`^${key.replace(/:[^/]+/g, "([^/]+)")}$`);
      return regex.test(path);
    });

    if (matchedKey) {
      const regex = new RegExp(`^${matchedKey.replace(/:[^/]+/g, "([^/]+)")}$`);
      const dynamicParams = regex.exec(path).slice(1);
      const dynamicHandler = routes[matchedKey][method];

      const paramKeys = matchedKey
        .match(/:[^/]+/g)
        .map((key) => key.substring(1));

      const params = dynamicParams.reduce(
        (acc, val, i) => ({ ...acc, [paramKeys[i]]: val }),
        {}
      );

      req.params = params;
      handler = dynamicHandler;
    }
  }

  // 404
  if (!handler) {
    handler = routes.notFound;
  }

  handler(req, res);
});

const PORT = config.port;
server.listen(PORT, console.info(`Server is running on port ${PORT}`));
