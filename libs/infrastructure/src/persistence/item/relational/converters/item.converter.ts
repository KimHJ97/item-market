import { Item } from '@domain/item/item';
import { ItemEntity } from '../entities/item.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemConverter {
  toDomain(entity: ItemEntity): Item {
    return {
      id: entity.id,
      name: entity.name,
      price: Number(entity.price),
      vendor: entity.vendor,
      link: entity.link,
      createDateTime: entity.createDateTime,
      updateDateTime: entity.updateDateTime,
    };
  }

  toEntity(domain: Item): ItemEntity {
    const entity = new ItemEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.price = domain.price;
    entity.vendor = domain.vendor;
    entity.link = domain.link;
    // entity.createDateTime, updateDateTime은 DB 자동 처리
    return entity;
  }
}
