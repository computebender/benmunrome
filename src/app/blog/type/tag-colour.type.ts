export const TagColour = {
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green',
  YELLOW: 'yellow',
  PURPLE: 'purple',
} as const;

export type TagColourType = (typeof TagColour)[keyof typeof TagColour];
