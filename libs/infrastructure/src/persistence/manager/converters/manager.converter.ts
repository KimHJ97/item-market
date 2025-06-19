import { Injectable } from '@nestjs/common';
import { ManagerEntity } from '@persistence/manager/entities/manager.entity';
import { Manager } from '@domain/manager/manager';

@Injectable()
export class ManagerConverter {
  toDomain(entity: ManagerEntity): Manager {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      status: entity.status,
      createDateTime: entity.createDateTime,
      updateDateTime: entity.updateDateTime,
    };
  }

  toEntity(domain: Manager): ManagerEntity {
    const entity = new ManagerEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.email = domain.email;
    entity.password = domain.password;
    entity.role = domain.role;
    entity.status = domain.status;
    return entity;
  }
}
