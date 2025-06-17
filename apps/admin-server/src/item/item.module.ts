import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.api.controller';
import { ItemPersistenceModule } from '@persistence/item/item-persistence.module';
import { ItemViewController } from './item.view.controller';

@Module({
  imports: [ItemPersistenceModule],
  controllers: [ItemController, ItemViewController],
  providers: [ItemService],
})
export class ItemModule {}
