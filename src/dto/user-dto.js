export class UserRes {
  id;
  name;
  email;
  dob;

  constructor(id, name, email, dob) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.dob = dob;
  }
}

export class CreateUserReq {
  name;
  email;
  dob;

  constructor(name, email, dob) {
    this.name = name;
    this.email = email;
    this.dob = dob;
  }

  validate() {
    // can use 3rd party validation pkg, but bcs it's a simple one so vanilla it is
    if (typeof this.name !== "string")
      throw new Error("name must be string/required");

    if (typeof this.email !== "string")
      throw new Error("email must be string/required");

    if (typeof this.dob === "string") {
      if (isNaN(Date.parse(this.dob)))
        throw new Error("date of birth is not a valid date.");
      this.dob = new Date(this.dob);
    } else {
      throw new Error("date of birth must be string/required");
    }
  }
}
