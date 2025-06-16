import { Item } from '@domain/item/item';

export interface ItemRepository {
  save(item: Item): Promise<Item>;
  findById(id: number): Promise<Item | null>;
  findAll(): Promise<Item[]>;
  delete(id: number): Promise<void>;
}