import { useAppStore } from '../store/useAppStore';

export default function CompareToggle({ id }: { id: string }) {
  const toggle = useAppStore((s) => s.toggleCompare);
  const selected = useAppStore((s) => s.compare.includes(id));
  const disabled = useAppStore((s) => s.compare.length >= 3 && !selected);

  return (
    <button
      aria-label="Add to compare"
      disabled={disabled}
      onClick={() => toggle(id)}
      className={`rounded-full border px-3 py-1 text-sm ${selected ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : disabled ? 'border-slate-200 bg-slate-100 text-slate-400' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}`}
    >
      {selected ? '✓ Comparing' : 'Compare'}
    </button>
  );
}