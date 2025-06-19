import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ItemCreateRequest } from './dto/item-create.request';
import { ItemUpdateRequest } from './dto/item-update.request';
import { Item } from '@domain/item/item';
import { ItemRepository } from '@persistence/item/item.repository';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ItemRepository')
    private readonly itemRepository: ItemRepository,
  ) {}

  createItem(createItemDto: ItemCreateRequest): Promise<Item> {
    const item = {
      ...createItemDto,
      createDateTime: new Date(),
      updateDateTime: new Date(),
    } as Item;

    return this.itemRepository.save(item);
  }

  findItemAll(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }

  async findItemById(id: number): Promise<Item> {
    const item = await this.itemRepository.findById(id);
    if (!item) throw new NotFoundException(`Item #${id} not found`);
    return item;
  }

  async updateItem(
    id: number,
    updateItemDto: ItemUpdateRequest,
  ): Promise<Item> {
    const findItem = await this.findItemById(id);
    return this.itemRepository.save({
      ...findItem,
      ...updateItemDto,
      updateDateTime: new Date(),
    });
  }

  async removeItem(id: number) {
    await this.findItemById(id);
    return this.itemRepository.delete(id);
  }
}
