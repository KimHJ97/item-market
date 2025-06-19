import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from '@domain/item/item';
import { ItemCreateRequest } from './dto/item-create.request';
import { ItemUpdateRequest } from './dto/item-update.request';
import { CommonResponse } from '../common/common.response';

@Controller('/api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async createItem(
    @Body() dto: ItemCreateRequest,
  ): Promise<CommonResponse<Item>> {
    const item = await this.itemService.createItem(dto);
    return CommonResponse.success(item);
  }

  @Get()
  async findItemAll(): Promise<CommonResponse<Item[]>> {
    const items = await this.itemService.findItemAll();
    return CommonResponse.success(items);
  }

  @Get(':id')
  async findItemById(@Param('id') id: number): Promise<CommonResponse<Item>> {
    const item = await this.itemService.findItemById(id);
    return CommonResponse.success(item);
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: number,
    @Body() dto: ItemUpdateRequest,
  ): Promise<CommonResponse<Item>> {
    const item = await this.itemService.updateItem(id, dto);
    return CommonResponse.success(item);
  }

  @Delete(':id')
  async removeItem(@Param('id') id: number): Promise<CommonResponse<void>> {
    await this.itemService.removeItem(id);
    return CommonResponse.success(undefined as void);
  }
}
