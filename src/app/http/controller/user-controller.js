import * as helper from "../helper.js";
import * as models from "../../../models/index.js";
import * as dto from "../../../dto/index.js";
import localmem from "../../../db/localmem.js";

export async function createUser(req, res) {
  let createReq;
  try {
    const bodyUnparsed = await helper.getBody(req);
    createReq = JSON.parse(bodyUnparsed, (key, value) =>
      key === "" ? Object.assign(new dto.CreateUserReq(), value) : value
    );
  } catch (error) {
    return helper.response(res, 400, "bad request, parse body data fail");
  }

  try {
    createReq.validate();
  } catch (error) {
    return helper.response(res, 400, error.message);
  }

  let newUser = new models.User(
    localmem.users.length, // id
    createReq.name,
    createReq.email,
    createReq.dob
  );
  localmem.users.push(newUser);

  return helper.response(
    res,
    200,
    "user created!",
    new dto.UserRes(newUser.id, newUser.name, newUser.email, newUser.dob)
  );
}

export async function indexUser() {}

export async function destroyUser() {}

export async function updateUser() {}
