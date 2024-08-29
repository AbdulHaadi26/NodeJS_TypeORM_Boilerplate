import { bcryptHash } from "../common";
import { getRepository } from "../database/database.config";
import { EmployeeEntity } from "../database/enitites";
import { CreateEmployeeDTO } from "../utils";

const EmployeeRepo = getRepository(EmployeeEntity);

export const getById = (id: number, tenantId: string) =>
  EmployeeRepo.findOne({ where: { id, tenantId } });

export const create = async (employee: CreateEmployeeDTO) => {
  const newEmployee = {
    ...employee,
    password: await bcryptHash(employee.password),
  };

  await EmployeeRepo.save(newEmployee);
  return newEmployee;
};
