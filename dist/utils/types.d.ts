export declare const gender: {
    readonly MALE: "male";
    readonly FEMALE: "female";
};
export type Gender = (typeof gender)[keyof typeof gender];
export type Locale = 'de' | 'fr' | 'en' | 'it';
export declare const LOCALES: Locale[];
export declare const DEFAULT_LOCALE = "de";
