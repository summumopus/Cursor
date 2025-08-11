import { PROCEDURES } from '../data/procedures';
import { useAppStore } from '../store/useAppStore';

const popularIds = ['dental_implants', 'hip_replacement', 'heart_bypass', 'ivf'] as const;

export default function PopularSearches({ onSelect }: { onSelect: () => void }) {
  const setSearch = useAppStore((s) => s.setSearch);

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {PROCEDURES.filter((p) => popularIds.includes(p.id as any)).map((p) => (
        <button
          key={p.id}
          onClick={() => {
            setSearch({ procedure: p.id });
            onSelect();
          }}
          className="rounded-full border border-brand.primary bg-white px-4 py-2 text-sm text-brand.primary hover:bg-blue-50"
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}