import { Request, Response } from "express";
import { create, getById } from "../services/employee.service";
import { ResponseCodes } from "../utils";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { id, tenantId } = req.user;

    const employee = await getById(id, tenantId);

    if (!employee) {
      return res.error(ResponseCodes.UNAUTHORIZED, "Employee not found");
    }

    res.success(employee);
  } catch (e) {
    res.error(ResponseCodes.INTERNAL_SERVER_ERROR, e);
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.user;

    await create({
      ...req.body,
      tenant: tenantId,
    });

    return res.success({
      message: "Employee created successfully",
    });
  } catch (e) {
    res.error(ResponseCodes.INTERNAL_SERVER_ERROR, e);
  }
};
