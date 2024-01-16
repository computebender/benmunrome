import { TagColourType } from '../type/tag-colour.type';

export interface TagDTO {
  uid?: string;
  name: string;
  colour: TagColourType;
}
