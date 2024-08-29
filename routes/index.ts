import { Application } from "express";
import passport from "passport";
import { AuthRouter } from "./auth.route";
import { EmployeeRouter } from "./employee.route";
export const defineRoutes = (app: Application) => {
  app.use("/api/auth", AuthRouter);
  app.use(
    "/api/employee",
    passport.authenticate("jwt", { session: false }),
    EmployeeRouter
  );
};
