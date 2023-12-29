import * as helper from "./helper.js";
import * as controller from "./controller/index.js";

export default function (req, res) {
  switch (`${req.method} ${req.url}`) {
    // ping route
    case "GET /api":
      (function (req, res) {
        helper.response(res, 200, "api is up");
      })(req, res);
      break;

    case "GET /users":
      break;
    case "POST /users":
      controller.createUser(req, res);
      break;
    case "PUT /users":
      break;
    case "DELETE /users":
      break;
    case "UPDATE /users":
      break;

    default:
      break;
  }
}
