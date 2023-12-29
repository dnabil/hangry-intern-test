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
    201,
    "user created!",
    new dto.UserRes(newUser.id, newUser.name, newUser.email, newUser.dob)
  );
}

export async function indexUser(req, res) {
  let users = [];
  localmem.users.forEach((element) => {
    if (element === undefined) return;
    users.push(
      new dto.UserRes(element.id, element.name, element.email, element.dob)
    );
  });

  if (users.length == 0) {
    return helper.response(res, 404, "no users data found :(", []);
  }

  return helper.response(res, 200, "found", users);
}

export async function destroyUser(req, res) {
  let user = localmem.users[req.params.id];
  if (user === undefined) {
    return helper.response(res, 404, "user not found");
  }
  delete localmem.users[user.id];
  return helper.response(res, 200, "user deleted");
}

export async function updateUser(req, res) {
  let id = req.params.id;

  let user = localmem.users[id];

  if (user == undefined) {
    return helper.response(res, 404, "user not found");
  }

  let updateReq;
  try {
    const bodyUnparsed = await helper.getBody(req);
    updateReq = JSON.parse(bodyUnparsed, (key, value) =>
      key === "" ? Object.assign(new dto.CreateUserReq(), value) : value
    );
  } catch (error) {
    return helper.response(res, 400, "bad request, parse body data fail");
  }

  // validate data
  try {
    updateReq.validate();
  } catch (error) {
    return helper.response(res, 400, error.message);
  }

  // update
  user.name = updateReq.name;
  user.email = updateReq.email;
  user.dob = updateReq.dob;

  helper.response(
    res,
    200,
    "user data updated",
    new dto.UserRes(id, user.name, user.email, user.dob)
  );
}

export async function getUserById(req, res) {
  let user = localmem.users[req.params.id];
  if (user === undefined) {
    return helper.response(res, 404, "user not found");
  }

  return helper.response(
    res,
    200,
    "user found",
    new dto.UserRes(user.id, user.name, user.email, user.dob)
  );
}
