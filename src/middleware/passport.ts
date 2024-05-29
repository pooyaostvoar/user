import { AppDataSource } from "../database/datasource";
import { User } from "../database/entity/user";

export const passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");

passport.use(
  new LocalStrategy(async function verify(
    username: string,
    password: string,
    cb: any
  ) {
    let user: any;
    try {
      console.log("hereee");
      user = await AppDataSource.getRepository(User).findOne({
        where: { username },
      });
      console.log(user, "userrrr");
      if (!user) {
        return cb(null, false, {
          message: "Incorrect username or password.",
        });
      }
    } catch (err) {
      console.log("errrrrr", err);
      cb(err);
    }

    crypto.pbkdf2(
      password,
      user.salt,
      310000,
      32,
      "sha256",
      function (err: any, hashedPassword: string) {
        if (err) {
          return cb(err);
        }
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }
        console.log("thisssss");
        return cb(null, user);
      }
    );
  })
);

passport.serializeUser(function (user: User, cb: any) {
  console.log("serializeUser");
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user: User, cb: any) {
  console.log("deserializeUser", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});
