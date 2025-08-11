export interface SampleOffer {
  id: string;
  hospitalName: string;
  countryCode: string;
  city: string;
  type: 'Private' | 'Public' | 'Specialty Clinic';
  accreditations: string[]; // e.g., JCI, ISO 9001, Local Ministry
  languages: string[]; // English, Spanish, German, French
  packageIncludes: string[]; // Hotel, Transfers, Follow-up
  startingFrom: number;
  rating: number;
  reviews: number;
  nextAvailable: string;
}

function make(id: string, countryCode: string, city: string, idx: number): SampleOffer {
  const accSets = [
    ['JCI', 'ISO 9001'],
    ['JCI', 'Local Ministry'],
    ['ISO 9001', 'Local Ministry'],
    ['JCI', 'ISO 9001', 'Local Ministry'],
  ];
  const types: SampleOffer['type'][] = ['Private', 'Public', 'Specialty Clinic'];
  const langs = [
    ['English', 'Spanish'],
    ['English'],
    ['English', 'German'],
    ['English', 'French'],
  ];
  const inc = [
    ['Hotel', 'Transfers', 'Follow-up'],
    ['Transfers', 'Follow-up'],
    ['Hotel', 'Follow-up'],
    ['Hotel', 'Transfers'],
  ];
  const base = 1200 + (idx % 8) * 500;
  return {
    id,
    hospitalName: `Global Health Center ${idx + 1}`,
    countryCode,
    city,
    type: types[idx % types.length],
    accreditations: accSets[idx % accSets.length],
    languages: langs[idx % langs.length],
    packageIncludes: inc[idx % inc.length],
    startingFrom: base,
    rating: 4.2 + ((idx % 5) * 0.1),
    reviews: 120 + (idx % 10) * 15,
    nextAvailable: new Date(Date.now() + (5 + (idx % 10)) * 24 * 3600 * 1000).toLocaleDateString(),
  };
}

const countries = [
  ['TR', 'Istanbul'],
  ['MX', 'Tijuana'],
  ['TH', 'Bangkok'],
  ['IN', 'Mumbai'],
  ['CR', 'San José'],
  ['PL', 'Warsaw'],
  ['HU', 'Budapest'],
  ['CO', 'Bogotá'],
  ['MY', 'Kuala Lumpur'],
  ['VN', 'Ho Chi Minh City'],
  ['CZ', 'Prague'],
] as const;

export const sampleOffers: SampleOffer[] = Array.from({ length: 55 }).map((_, i) => {
  const [code, city] = countries[i % countries.length];
  return make(`${code}-offer-${i + 1}`, code, city, i);
});