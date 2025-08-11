import { COUNTRIES } from '../data/countries';
import { useAppStore } from '../store/useAppStore';

export default function CountrySelect() {
  const search = useAppStore((s) => s.search);
  const setSearch = useAppStore((s) => s.setSearch);

  return (
    <select
      value={search.countryCode}
      onChange={(e) => setSearch({ countryCode: e.target.value })}
      className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand.primary"
    >
      {COUNTRIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.flag} {c.name}
        </option>
      ))}
    </select>
  );
}