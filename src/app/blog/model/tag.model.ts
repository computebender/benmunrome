import { TagColourType } from '../type/tag-colour.type';

export interface Tag {
  firestoreId?: string;
  id: string;
  name: string;
  colour: TagColourType;
}
