import http from "http";
import config from "../../config/index.js";
import routes from "./routes.js";

const server = http.createServer((req, res) => {
  routes(req, res);
});

const PORT = config.port;
server.listen(PORT, console.info(`Server is running on port ${PORT}`));
