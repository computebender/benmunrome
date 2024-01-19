import { TagColourType } from '../model/tag.model';

export const tagColourToTailwindClass = (
  colour: TagColourType,
): { background: string; text: string } => {
  switch (colour) {
    case 'red':
      return { background: 'bg-red-100', text: 'text-red-800' };
    case 'blue':
      return { background: 'bg-blue-100', text: 'text-blue-800' };
    case 'green':
      return { background: 'bg-green-100', text: 'text-green-800' };
    case 'yellow':
      return { background: 'bg-yellow-100', text: 'text-yellow-800' };
    case 'purple':
      return { background: 'bg-purple-100', text: 'text-purple-800' };
    default:
      return { background: 'bg-gray-100', text: 'text-gray-800' };
  }
};
