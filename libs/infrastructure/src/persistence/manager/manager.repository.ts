import { Manager } from '@domain/manager/manager';

export interface ManagerRepository {
  save(manager: Manager): Promise<Manager>;

  findById(id: number): Promise<Manager | null>;

  findByEmail(email: string): Promise<Manager | null>;

  findAll(): Promise<Manager[]>;
}
