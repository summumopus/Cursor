export interface CountryOption {
  code: string;
  name: string;
  flag: string; // emoji flag
}

export const COUNTRIES: CountryOption[] = [
  { code: 'ALL', name: 'All Countries', flag: '🌍' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
];