import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from '@domain/item/item';
import { ItemRepository } from '@persistence/item/item.repository';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ItemRepository')
    private readonly itemRepository: ItemRepository,
  ) {}

  create(createItemDto: CreateItemDto): Promise<Item> {
    const item = {
      ...createItemDto,
      createDateTime: new Date(),
      updateDateTime: new Date(),
    } as Item;

    return this.itemRepository.save(item);
  }

  findAll(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findById(id);
    if (!item) throw new NotFoundException(`Item #${id} not found`);
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const findItem = await this.findOne(id);
    return this.itemRepository.save({
      ...findItem,
      ...updateItemDto,
      updateDateTime: new Date(),
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.itemRepository.delete(id);
  }
}
