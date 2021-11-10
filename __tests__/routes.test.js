"use strict";
require("dotenv").config();

let supertest = require("supertest");
let server = require("../src/server");
let mockReq = supertest(server.server);

let users = {
  admin: { username: "sana", password: "sana", role: "admin" },
  editor: { username: "raneem", password: "raneem", role: "editor" },
  writer: { username: "munes", password: "munes", role: "writer" },
  user: { username: "mahmoud", password: "mahmoud", role: "user" },
};
describe("sign-up sign-in", () => {
  Object.keys(users).forEach((user) => {
    xit("sign up", async () => {
      let res = await mockReq.post("/signup").send(users[user]);
      expect(res.status).toEqual(201);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.id).toBeDefined();
      expect(res.body.user.username).toEqual(users[user].username);
    });

    it("sign in", async () => {
      let res = await mockReq
        .post("/signin")
        .auth(users[user].username, users[user].password);
      expect(res.status).toEqual(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.id).toBeDefined();
      expect(res.body.user.username).toEqual(users[user].username);
    });
  });
});

describe("/users + /secret", () => {
  it("/secret", async () => {
    let res = await mockReq
      .post("/signin")
      .auth(users.user.username, users.user.password);
    const token_1 = res.body.token;
    let res2 = await mockReq
      .get("/secret")
      .set(`Authorization`, `Bearer ${token_1}`);
    expect(res2.status).toEqual(200);
    expect(res2.text).toEqual("Welcome to the secret area");
  });

  it("/users", async () => {
    let res1 = await mockReq
      .post("/signin")
      .auth(users.admin.username, users.admin.password);
    const token_2 = res1.body.token;
    let res = await mockReq
      .get("/users")
      .set({ Authorization: `Bearer ${token_2}` });
    expect(res.status).toEqual(200);
  });
});
