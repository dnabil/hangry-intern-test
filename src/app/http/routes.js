import url from "url";
import * as helper from "./helper.js";
import * as controller from "./controller/index.js";

const routes = {
  "/ping": {
    GET: (_req, res) => {
      helper.response(res, 200, "api is up");
    },
  },

  "/users": {
    GET: controller.user.indexUser,
    POST: controller.user.createUser,
  },

  "/users/:id": {
    GET: controller.user.getUserById,
    DELETE: controller.user.destroyUser,
    PUT: controller.user.updateUser,
  },

  notFound: (_req, res) => helper.response(res, 400, `path not found`),
};
export default routes;
