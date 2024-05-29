import express, { Express, Request, Response } from "express";
import session from "express-session";
//typeorm
import "reflect-metadata";
import bodyParser from "body-parser";
import { AppDataSource } from "./database/datasource";
import { googleRouter } from "./api/google";
import { passwordAuthRouter } from "./api/auth-password";
import cors from "cors";
import { passport } from "./middleware/passport";

const isTesting = process.env.NODE_ENV === "test";

if (!isTesting) {
  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
    })
    .catch((error) => console.log(error));
}

const app: Express = express();
const port = 3004;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // Configure other options as needed
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use("", googleRouter);
app.use("", passwordAuthRouter);

export default app;
