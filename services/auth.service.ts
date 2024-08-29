import { bcryptCompare, jwtSign } from "../common";
import { getRepository } from "../database/database.config";
import { EmployeeEntity } from "../database/enitites";

const EmployeeRepo = getRepository(EmployeeEntity);

export const signIn = async (email: string, password: string) => {
  const employee = await EmployeeRepo.findOne({ where: { email } });
  if (!employee) {
    return null;
  }

  const isPasswordValid = await bcryptCompare(password, employee.password);
  if (!isPasswordValid) {
    return null;
  }

  return jwtSign({ id: employee.id, tenantId: employee.tenantId });
};
