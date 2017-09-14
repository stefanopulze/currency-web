import {Tag} from './tag.model';

export class Transaction {

  created_at: string;
  description: string;
  id: number;
  latitude: number;
  longitude: number;
  accuracy: number;
  updated_at: string;
  value: number;
  tags: Tag[];

}
