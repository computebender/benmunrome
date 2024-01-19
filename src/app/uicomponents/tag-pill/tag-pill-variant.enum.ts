export const PILL_VARIANT = {
  SMALL: 'small',
  LARGE: 'large',
} as const;

export type PillVariantType = (typeof PILL_VARIANT)[keyof typeof PILL_VARIANT];
