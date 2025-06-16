import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from '@persistence/item/relational/entities/item.entity';
import { ItemRelationalRepository } from '@persistence/item/relational/repositories/item.repository';
import { ItemConverter } from '@persistence/item/relational/converters/item.converter';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  providers: [
    ItemConverter,
    {
      provide: 'ItemRepository',
      useClass: ItemRelationalRepository,
    },
  ],
  exports: ['ItemRepository'],
})
export class ItemPersistenceModule {}
