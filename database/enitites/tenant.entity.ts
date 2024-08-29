import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeEntity } from "./employee.entity";

@Entity("tenants")
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  tenantId: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToMany(() => EmployeeEntity, (employee) => employee.tenant)
  employees: EmployeeEntity[];

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
