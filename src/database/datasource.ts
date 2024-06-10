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
        host: "db",
        port: 5434,
        username: "route_admin",
        password: "route_admin",
        database: "user_db",
        synchronize: true,
        entities: [User],
      }
);
