import { sampleOffers } from '../data/sampleOffers';
import { useAppStore } from '../store/useAppStore';
import { formatMoney } from '../utils/format';

export default function ComparePage() {
  const ids = useAppStore((s) => s.compare);
  const offers = ids.map((id) => sampleOffers.find((o) => o.id === id)).filter(Boolean);

  if (offers.length === 0) return <div className="p-6">No items to compare.</div>;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-4 text-xl font-semibold text-slate-800">Compare offers</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {offers.map((o) => (
          <div key={o!.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-1 text-lg">{o!.hospitalName}</div>
            <div className="mb-2 text-sm text-slate-600">{o!.city} • {o!.countryCode}</div>
            <div className="mb-2 text-sm">Starting: {formatMoney(o!.startingFrom)}</div>
            <div className="mb-2 text-sm">Accreditations: {o!.accreditations.join(', ')}</div>
            <div className="mb-2 text-sm">Languages: {o!.languages.join(', ')}</div>
            <div className="mb-2 text-sm">Includes: {o!.packageIncludes.join(', ')}</div>
            <div className="mb-2 text-sm">Rating: {o!.rating.toFixed(1)} ({o!.reviews} reviews)</div>
            <div className="text-sm">Next: {o!.nextAvailable}</div>
          </div>
        ))}
      </div>
    </div>
  );
}