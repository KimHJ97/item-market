import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from '../entities/item.entity';
import { Item } from '@domain/item/item';
import { ItemConverter } from '../converters/item.converter';
import { ItemRepository } from '@persistence/item/item.repository';

@Injectable()
export class ItemRelationalRepository implements ItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly repository: Repository<ItemEntity>,
    private readonly itemConverter: ItemConverter,
  ) {}

  async save(item: Item): Promise<Item> {
    const entity = this.itemConverter.toEntity(item);
    const saved = await this.repository.save(entity);
    return this.itemConverter.toDomain(saved);
  }

  async findById(id: number): Promise<Item | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.itemConverter.toDomain(entity) : null;
  }

  async findAll(): Promise<Item[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.itemConverter.toDomain(entity));
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
