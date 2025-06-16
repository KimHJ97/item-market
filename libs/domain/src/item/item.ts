import { Vendor } from './vendor';

export class Item {
  id: number;
  name: string;
  price: number;
  vendor: Vendor;
  link: string;
  createDateTime: Date;
  updateDateTime: Date;
}
