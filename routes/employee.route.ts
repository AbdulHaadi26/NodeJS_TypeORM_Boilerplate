import express from "express";
import { createEmployee, getProfile } from "../controller";

const router = express.Router();

router.get("/profile", getProfile);
router.post(``, createEmployee);

export { router as EmployeeRouter };
