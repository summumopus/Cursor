import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getTopRecommendations } from '../utils/pricingRules';
import RecommendationCard from '../components/RecommendationCard';
import { Link } from 'react-router-dom';

export default function RecommendationsPage() {
  const { search } = useAppStore();

  const recs = useMemo(() => {
    if (!search.procedure) return [] as any[];
    const top = getTopRecommendations(
      search.procedure,
      search.countryCode,
      search.budget?.range || null,
      (search.priority || 'lowest_cost') as any
    );

    return top.map((t, idx) => ({
      countryCode: t.countryCode,
      city: sampleCityForCountry(t.countryCode),
      priceMin: t.band.min,
      priceMax: t.band.max,
      rating: 4.2 + (idx * 0.2),
      reviews: 180 + idx * 70,
      reason: t.band.reason,
      availableWeeks: 1 + idx, // 1-3 weeks
      offerId: `${t.countryCode}-${search.procedure}`,
    }));
  }, [search]);

  if (!search.procedure) {
    return <div className="mx-auto max-w-5xl p-6">Please select a procedure to view recommendations.</div>;
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xl font-semibold text-slate-800">Top recommendations</div>
        <Link to="/results" className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">View all offers</Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {recs.map((r) => (
          <RecommendationCard key={r.offerId} {...r} />
        ))}
      </div>
    </div>
  );
}

function sampleCityForCountry(code: string) {
  const map: Record<string, string> = {
    TR: 'Istanbul',
    MX: 'Tijuana',
    TH: 'Bangkok',
    IN: 'Mumbai',
    PL: 'Warsaw',
    CZ: 'Prague',
    CO: 'Bogotá',
    MY: 'Kuala Lumpur',
  };
  return map[code] || 'City';
}