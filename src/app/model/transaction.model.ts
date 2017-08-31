import {Tag} from './tag.model';

export class Transastion {

  created_at: string;
  description: string;
  id: number;
  lat: number;
  lng: number;
  updated_at: string;
  value: number;
  tags: Tag[];

}
