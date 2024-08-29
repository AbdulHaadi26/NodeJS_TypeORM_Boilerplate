import { DataSource } from "typeorm";
import { Envioronments } from "../utils";
import { EmployeeEntity, TenantEntity } from "./enitites";

let synchronize = true;

if (process.env.NODE_ENV !== Envioronments.LOCAL) {
  synchronize = false;
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST_NAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [TenantEntity, EmployeeEntity],
  migrations: ["src/database/migrations/**/*.ts"],
  synchronize: synchronize,
});

export const getRepository = (entity: any) =>
  AppDataSource.getRepository(entity);
