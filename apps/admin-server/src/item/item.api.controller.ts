import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put, Render,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from '@domain/item/item';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() dto: CreateItemDto): Promise<Item> {
    return this.itemService.create(dto);
  }

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateItemDto): Promise<Item> {
    return this.itemService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.itemService.remove(id);
  }
}
