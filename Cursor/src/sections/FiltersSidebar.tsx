import { useAppStore } from '../store/useAppStore';

export default function FiltersSidebar() {
  const { filters, setFilters, resetFilters } = useAppStore();

  return (
    <div className="sticky top-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-800">Filters</div>
        <button onClick={resetFilters} className="text-sm text-slate-500 hover:underline">Reset</button>
      </div>

      <div className="mb-4">
        <div className="mb-2 text-sm font-medium text-slate-700">Price range</div>
        <select
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          value={filters.priceRange ? `${filters.priceRange[0]}-${filters.priceRange[1]}` : ''}
          onChange={(e) => {
            const val = e.target.value;
            if (!val) return setFilters({ priceRange: null });
            const [min, max] = val.split('-').map((n) => Number(n));
            setFilters({ priceRange: [min, max] as [number, number] });
          }}
        >
          <option value="">Any</option>
          <option value="0-2000">Under $2,000</option>
          <option value="2000-5000">$2,000 - $5,000</option>
          <option value="5000-15000">$5,000 - $15,000</option>
          <option value="15000-30000">$15,000 - $30,000</option>
          <option value="30000-50000">$30,000 - $50,000</option>
        </select>
      </div>

      <div className="mb-4">
        <div className="mb-2 text-sm font-medium text-slate-700">Accreditation</div>
        {[
          ['jci', 'JCI'],
          ['iso', 'ISO 9001'],
          ['local', 'Local Ministry'],
        ].map(([key, label]) => (
          <label key={key} className="mb-1 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={(filters.accreditations as any)[key]}
              onChange={(e) => setFilters({ accreditations: { ...filters.accreditations, [key]: e.target.checked } })}
            />
            {label}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <div className="mb-2 text-sm font-medium text-slate-700">Hospital type</div>
        {[
          ['private', 'Private'],
          ['public', 'Public'],
          ['specialty', 'Specialty Clinic'],
        ].map(([key, label]) => (
          <label key={key} className="mb-1 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={(filters.hospitalTypes as any)[key]}
              onChange={(e) => setFilters({ hospitalTypes: { ...filters.hospitalTypes, [key]: e.target.checked } })}
            />
            {label}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <div className="mb-2 text-sm font-medium text-slate-700">Languages</div>
        {Object.keys(filters.languages).map((lang) => (
          <label key={lang} className="mb-1 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.languages[lang]}
              onChange={(e) => setFilters({ languages: { ...filters.languages, [lang]: e.target.checked } })}
            />
            {lang}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <div className="mb-2 text-sm font-medium text-slate-700">Package includes</div>
        {[
          ['hotel', 'Hotel'],
          ['transfers', 'Transfers'],
          ['followup', 'Follow-up'],
        ].map(([key, label]) => (
          <label key={key} className="mb-1 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={(filters.packageIncludes as any)[key]}
              onChange={(e) => setFilters({ packageIncludes: { ...filters.packageIncludes, [key]: e.target.checked } })}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}