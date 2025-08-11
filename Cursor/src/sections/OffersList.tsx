import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { sampleOffers } from '../data/sampleOffers';
import FavoriteButton from '../components/FavoriteButton';
import CompareToggle from '../components/CompareToggle';

export default function OffersList() {
  const { filters } = useAppStore();

  const filtered = useMemo(() => {
    return sampleOffers.filter((o) => {
      if (filters.priceRange) {
        if (o.startingFrom < filters.priceRange[0] || o.startingFrom > filters.priceRange[1]) return false;
      }
      if (filters.accreditations.jci && !o.accreditations.includes('JCI')) return false;
      if (filters.accreditations.iso && !o.accreditations.includes('ISO 9001')) return false;
      if (filters.accreditations.local && !o.accreditations.includes('Local Ministry')) return false;
      if (filters.hospitalTypes.private && o.type !== 'Private') return false;
      if (filters.hospitalTypes.public && o.type !== 'Public') return false;
      if (filters.hospitalTypes.specialty && o.type !== 'Specialty Clinic') return false;
      const langSelected = Object.entries(filters.languages).filter(([, v]) => v).map(([k]) => k);
      if (langSelected.length && !langSelected.every((l) => o.languages.includes(l))) return false;
      const incSelected = Object.entries(filters.packageIncludes).filter(([, v]) => v).map(([k]) => k);
      if (incSelected.length && !incSelected.every((i) => o.packageIncludes.includes(i))) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-4">
      {filtered.map((o) => (
        <div key={o.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-1 flex items-center justify-between">
            <div className="text-lg">🏥 {o.hospitalName}</div>
            <div className="flex gap-2"><FavoriteButton id={o.id} /><CompareToggle id={o.id} /></div>
          </div>
          <div className="mb-1 text-sm text-slate-600">📍 {o.city} • 15min from airport</div>
          <div className="mb-2 text-sm">💰 Starting from ${o.startingFrom.toLocaleString()}</div>
          <div className="mb-2 text-sm">🏆 {o.accreditations.join(' ✅ ')} </div>
          <div className="mb-2 text-sm">⭐ {o.rating.toFixed(1)} ({o.reviews} reviews)</div>
          <ul className="mb-2 list-disc pl-6 text-sm text-slate-700">
            <li>English-speaking surgeons</li>
            <li>Airport pickup included</li>
            <li>5-star recovery hotel</li>
            <li>1-year warranty</li>
          </ul>
          <div className="mb-3 text-sm">📅 Next available: {o.nextAvailable}</div>
          <Link to={`/offer/${o.id}`} className="rounded-lg bg-brand.primary px-4 py-2 text-white hover:bg-blue-600">View details</Link>
        </div>
      ))}
    </div>
  );
}