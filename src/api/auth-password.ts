import express, { Request, Response } from "express";
import { AppDataSource } from "../database/datasource";
import { passport } from "../middleware/passport";
import { User } from "../database/entity/user";
import { DeepPartial } from "typeorm";
var crypto = require("crypto");

export const passwordAuthRouter = express.Router();

passwordAuthRouter.get("/test", (req, res) => {
  res.send("logged in");
});

passwordAuthRouter.post(
  "/login/password",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/test",
    failureRedirect: "/test",
    failureMessage: true,
  })
);

/* POST /logout
 *
 * This route logs the user out.
 */
passwordAuthRouter.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

/* POST /signup
 *
 * This route creates a new user account.
 *
 * A desired username and password are submitted to this route via an HTML form,
 * which was rendered by the `GET /signup` route.  The password is hashed and
 * then a new user record is inserted into the database.  If the record is
 * successfully created, the user is logged in.
 */
passwordAuthRouter.post("/signup", async function (req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err: any, hashedPassword: DeepPartial<Buffer>) {
      if (err) {
        return next(err);
      }
      try {
        await AppDataSource.getRepository(User).save({
          username: req.body.username,
          password: hashedPassword,
          salt,
          email: "",
        });
        res.send({ ok: 1 });
      } catch (err) {
        res.redirect("/");
      }
    }
  );
});
console.log("endddddddddd");
