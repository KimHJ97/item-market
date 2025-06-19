import { ManagerRole } from '@domain/manager/manager.role';
import { ManagerStatus } from '@domain/manager/manager.status';

export class Manager {
  id: number;
  name: string;
  email: string;
  password: string;
  role: ManagerRole;
  status: ManagerStatus;
  createDateTime: Date;
  updateDateTime: Date;
}
