import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export default function CompareBar() {
  const compare = useAppStore((s) => s.compare);
  if (compare.length === 0) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-lg">
      <div className="flex items-center gap-3 text-sm">
        <span>{compare.length} selected</span>
        <Link to="/compare" className="rounded-full bg-brand.primary px-3 py-1 text-white">Compare now</Link>
      </div>
    </div>
  );
}