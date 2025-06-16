import { Controller, Get, Param } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from '@domain/item/item';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Item> {
    return this.itemService.findOne(id);
  }
}
