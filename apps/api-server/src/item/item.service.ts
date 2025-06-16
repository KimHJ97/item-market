import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '@domain/item/item';
import { ItemRepository } from '@persistence/item/item.repository';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ItemRepository')
    private readonly itemRepository: ItemRepository,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findById(id);
    if (!item) throw new NotFoundException(`Item #${id} not found`);
    return item;
  }

}
