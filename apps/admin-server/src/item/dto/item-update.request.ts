import { PartialType } from '@nestjs/mapped-types';
import { ItemCreateRequest } from './item-create.request';

export class ItemUpdateRequest extends PartialType(ItemCreateRequest) {}
