import { useAppStore } from '../store/useAppStore';

export default function FavoriteButton({ id }: { id: string }) {
  const toggle = useAppStore((s) => s.toggleFavorite);
  const active = useAppStore((s) => !!s.favorites[id]);
  return (
    <button
      aria-label="Save to favorites"
      onClick={() => toggle(id)}
      className={`rounded-full border px-3 py-1 text-sm ${active ? 'border-pink-300 bg-pink-50 text-pink-600' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}`}
    >
      {active ? '♥ Saved' : '♡ Save'}
    </button>
  );
}