import dotenv from "dotenv";
import path from "path";
import "reflect-metadata";

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: path.join(__dirname, envFile) });

import cors from "cors";
import express, { Application } from "express";
import { AppDataSource } from "./database/database.config";
import { passport, responseFormatter } from "./middlewares";

const app: Application = express();
const port = process.env.PORT ?? 8000;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(responseFormatter);

import { defineRoutes } from "./routes";

app.listen(port, async () => {
  try {
    await AppDataSource.initialize();
    defineRoutes(app);
    console.info(`Server is running at http://localhost:${port}`);
  } catch (error) {
    console.error(error);
  }
});
