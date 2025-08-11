import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { PROCEDURES, type ProcedureOption } from '../data/procedures';
import { useAppStore } from '../store/useAppStore';

interface Props {
  onSubmit: () => void;
}

export default function SearchBar({ onSubmit }: Props) {
  const [query, setQuery] = useState('');
  const setSearch = useAppStore((s) => s.setSearch);

  const fuse = useMemo(() => new Fuse(PROCEDURES, {
    includeScore: true,
    threshold: 0.35,
    keys: ['label', 'keywords']
  }), []);

  const results = query ? fuse.search(query).slice(0, 6).map(r => r.item) : PROCEDURES;

  function handleSelect(proc: ProcedureOption) {
    setQuery(proc.label);
    setSearch({ procedure: proc.id });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const best = results[0];
    if (best) {
      setSearch({ procedure: best.id });
      onSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand.primary"
        placeholder="Search procedures (e.g., Dental Implants)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <div className="absolute z-20 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg">
          {results.map((proc) => (
            <button
              type="button"
              key={proc.id}
              onClick={() => handleSelect(proc)}
              className="flex w-full items-start gap-3 px-4 py-2 text-left hover:bg-slate-50"
            >
              <span className="text-brand.primary">🔎</span>
              <span>{proc.label}</span>
            </button>
          ))}
        </div>
      )}
    </form>
  );
}