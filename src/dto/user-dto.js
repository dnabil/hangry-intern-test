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

  hi() {
    console.log("hi!!!");
  }

  validate() {
    // can use 3rd party validation pkg, but bcs it's a simple one so vanilla it is
    if (typeof this.name !== "string") {
      throw new Error("name must be string");
    }

    if (typeof this.email !== "string") {
      throw new Error("name must be string");
    }

    if (this.dob) {
      this.dob = Date.parse(this.dob);
      if (isNaN(this.dob)) {
        throw new Error("The variable is not a valid date.");
      }
    }
  }
}
