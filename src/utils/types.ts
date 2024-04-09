export const gender = {
  // the following are not PascalCase due to backward compatibility
  MALE: 'male',
  FEMALE: 'female',
} as const;
export type Gender = (typeof gender)[keyof typeof gender];

export type Locale = 'de' | 'fr' | 'en' | 'it';
export const LOCALES: Locale[] = ['de', 'fr', 'en', 'it'];
export const DEFAULT_LOCALE = 'de';
