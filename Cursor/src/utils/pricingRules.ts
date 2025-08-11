import type { ProcedureId } from '../data/procedures';

export interface PriceBand {
  min: number;
  max: number;
  reason: string;
}

export interface ProcedurePricingMap {
  [countryCode: string]: PriceBand;
}

export const PROCEDURE_PRICING: Record<ProcedureId, ProcedurePricingMap> = {
  dental_implants: {
    TR: { min: 450, max: 800, reason: '80% cheaper than UK/US' },
    MX: { min: 900, max: 1400, reason: 'Closest to US with quality care' },
    TH: { min: 700, max: 1200, reason: 'JCI hospitals + English staff' },
  },
  hip_replacement: {
    IN: { min: 4000, max: 7000, reason: 'Best value JCI hospitals' },
    TH: { min: 8000, max: 12000, reason: 'Premium care + medical visa' },
    PL: { min: 6000, max: 9000, reason: 'EU standards, short travel' },
  },
  knee_replacement: {
    IN: { min: 3500, max: 6000, reason: 'High-volume centers' },
    TR: { min: 6500, max: 9500, reason: 'European standards' },
    PL: { min: 5500, max: 8500, reason: 'EU standards' },
  },
  heart_bypass: {
    IN: { min: 5000, max: 8000, reason: 'World-class cardiac centers' },
    TR: { min: 12000, max: 18000, reason: 'European standards + accessibility' },
    TH: { min: 15000, max: 25000, reason: 'Premium private hospitals' },
  },
  cosmetic_surgery_ba: {
    TR: { min: 2500, max: 3500, reason: 'All-inclusive packages' },
    CO: { min: 3000, max: 4500, reason: 'Cosmetic surgery capital' },
    MX: { min: 2800, max: 4000, reason: 'Luxury clinics + recovery hotels' },
  },
  cataract_surgery: {
    IN: { min: 600, max: 1200, reason: 'Affordable with modern tech' },
    TR: { min: 800, max: 1500, reason: 'European standards' },
    TH: { min: 1000, max: 1800, reason: 'Premium private care' },
  },
  ivf: {
    IN: { min: 2800, max: 4200, reason: 'High success rates' },
    CZ: { min: 3500, max: 5500, reason: 'EU donor programs' },
    MX: { min: 4000, max: 6000, reason: 'Advanced fertility clinics' },
  },
  weight_loss_surgery: {
    MX: { min: 5000, max: 7500, reason: 'Experienced bariatric teams' },
    TR: { min: 4500, max: 7000, reason: 'All-inclusive packages' },
    MY: { min: 6000, max: 9000, reason: 'Modern private hospitals' },
  },
};

export type PriorityOption =
  | 'lowest_cost'
  | 'shortest_wait'
  | 'highest_accreditation'
  | 'english_doctors'
  | 'closest_to_home';

export function getTopRecommendations(
  procedure: ProcedureId,
  homeCountryCode: string | 'ALL',
  budgetBand: [number, number] | null,
  priority: PriorityOption
) {
  const entries = Object.entries(PROCEDURE_PRICING[procedure] || {});

  const scored = entries.map(([countryCode, band]) => {
    let score = 0;

    if (budgetBand) {
      // Budget fit boost if band overlaps
      const overlaps = !(band.max < budgetBand[0] || band.min > budgetBand[1]);
      score += overlaps ? 30 : 0;
    }

    if (priority === 'lowest_cost') {
      score += 40 - band.min / 1000; // cheaper wins
    } else if (priority === 'shortest_wait') {
      score += 20; // we will present short waits uniformly in demo
    } else if (priority === 'highest_accreditation') {
      score += 15; // selected destinations tend to have JCI presence
    } else if (priority === 'english_doctors') {
      score += ['TH', 'MX', 'TR', 'IN', 'PL', 'CZ', 'CO'].includes(countryCode) ? 10 : 0;
    } else if (priority === 'closest_to_home') {
      // Rough heuristic: same region preference
      const regionalAffinity: Record<string, string[]> = {
        US: ['MX', 'CR', 'CO'],
        CA: ['MX', 'CR'],
        UK: ['TR', 'PL', 'HU', 'CZ'],
        EU: ['PL', 'HU', 'CZ', 'TR'],
        AU: ['TH', 'MY', 'VN'],
      };
      const preferred = regionalAffinity[homeCountryCode] || [];
      score += preferred.includes(countryCode) ? 12 : 0;
    }

    return { countryCode, band, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3);
}