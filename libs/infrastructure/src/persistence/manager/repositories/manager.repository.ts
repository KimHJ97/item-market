import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerRepository } from '@persistence/manager/manager.repository';
import { ManagerEntity } from '@persistence/manager/entities/manager.entity';
import { Manager } from '@domain/manager/manager';
import { ManagerConverter } from '@persistence/manager/converters/manager.converter';

@Injectable()
export class ManagerRelationalRepository implements ManagerRepository {
  constructor(
    @InjectRepository(ManagerEntity)
    private readonly repository: Repository<ManagerEntity>,
    private readonly managerConverter: ManagerConverter,
  ) {}

  async save(item: Manager): Promise<Manager> {
    const entity = this.managerConverter.toEntity(item);
    const saved = await this.repository.save(entity);
    return this.managerConverter.toDomain(saved);
  }

  async findById(id: number): Promise<Manager | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.managerConverter.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<Manager | null> {
    const entity = await this.repository.findOne({ where: { email } });
    return entity ? this.managerConverter.toDomain(entity) : null;
  }

  async findAll(): Promise<Manager[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.managerConverter.toDomain(entity));
  }
}
