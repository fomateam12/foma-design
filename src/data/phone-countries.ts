// src/data/phone-countries.ts

export interface PhoneCountry {
  iso2: string;
  name: string;
  dialCode: string;
  flag: string;
}

/**
 * Fixed list — not user-extensible from the UI. Add a country here (and only
 * here) if the business starts serving a new market's resellers directly.
 */
export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso2: "US", name: "United States", dialCode: "1", flag: "🇺🇸" },
  { iso2: "TR", name: "Turkey", dialCode: "90", flag: "🇹🇷" },
  { iso2: "DE", name: "Germany", dialCode: "49", flag: "🇩🇪" },
  { iso2: "BE", name: "Belgium", dialCode: "32", flag: "🇧🇪" },
  { iso2: "NL", name: "Netherlands", dialCode: "31", flag: "🇳🇱" },
];

export const DEFAULT_PHONE_COUNTRY: PhoneCountry = PHONE_COUNTRIES[0];
