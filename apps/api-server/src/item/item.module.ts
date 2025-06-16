import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { ItemPersistenceModule } from '@persistence/item/item-persistence.module';

@Module({
  imports: [ItemPersistenceModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
