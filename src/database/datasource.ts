import { DataSource } from "typeorm";
import { User } from "./entity/user";

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        name: "default",
        type: "better-sqlite3",
        database: ":memory:",
        entities: [User],
        synchronize: true,
        dropSchema: true,
      }
    : {
        type: "postgres",
        host: "localhost",
        port: 5434,
        username: "route_admin",
        password: "route_admin",
        database: "after_life_user",
        synchronize: true,
        entities: [User],
      }
);
