import { Link } from 'react-router-dom';
import { COUNTRIES } from '../data/countries';

export default function RecommendationCard({
  countryCode,
  city,
  priceMin,
  priceMax,
  rating,
  reviews,
  reason,
  availableWeeks,
  offerId,
}: {
  countryCode: string;
  city: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  reviews: number;
  reason: string;
  availableWeeks: number;
  offerId: string;
}) {
  const country = COUNTRIES.find((c) => c.code === countryCode);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-2 text-sm font-medium text-slate-500">
        <span className="mr-2">{country?.flag}</span>
        <span className="font-semibold text-slate-800">{country?.name}</span> ({city})
      </div>
      <div className="mb-1 text-lg">💰 ${priceMin.toLocaleString()} - ${priceMax.toLocaleString()}</div>
      <div className="mb-2 text-sm text-slate-600">⭐ {rating.toFixed(1)} ({reviews} reviews)</div>
      <div className="mb-3 text-sm text-slate-700">“{reason}”</div>
      <div className="mb-4 text-sm text-emerald-600">✅ Available in {availableWeeks} weeks</div>
      <Link to={`/offer/${offerId}`} className="inline-block rounded-lg bg-brand.primary px-4 py-2 text-white hover:bg-blue-600">
        View Details
      </Link>
    </div>
  );
}