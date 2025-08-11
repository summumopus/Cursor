import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

const BUDGETS = [
  { label: 'Under $2,000', range: [0, 2000] as [number, number] },
  { label: '$2,000 - $5,000', range: [2000, 5000] as [number, number] },
  { label: '$5,000 - $15,000', range: [5000, 15000] as [number, number] },
  { label: '$15,000 - $30,000', range: [15000, 30000] as [number, number] },
  { label: '$30,000 - $50,000', range: [30000, 50000] as [number, number] },
  { label: '$50,000+', range: null },
];

const PRIORITIES = [
  { value: 'lowest_cost', label: 'Lowest Cost' },
  { value: 'shortest_wait', label: 'Shortest Wait Time (under 2 weeks)' },
  { value: 'highest_accreditation', label: 'Highest Accreditation (JCI certified)' },
  { value: 'english_doctors', label: 'English-Speaking Doctors' },
  { value: 'closest_to_home', label: 'Closest to Home' },
] as const;

export default function PreFilterModal({ open, onClose, onContinue }: { open: boolean; onClose: () => void; onContinue: () => void }) {
  const setSearch = useAppStore((s) => s.setSearch);
  const search = useAppStore((s) => s.search);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 text-xl font-semibold text-slate-800">Tailor your recommendations</div>

            <div className="mb-5">
              <div className="mb-2 text-sm font-medium text-slate-700">Budget Range</div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b.label}
                    onClick={() => setSearch({ budget: { label: b.label, range: b.range } })}
                    className={`rounded-lg border px-4 py-3 text-left ${search.budget?.label === b.label ? 'border-brand.primary bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-2 text-sm font-medium text-slate-700">Priority</div>
              <select
                value={search.priority || ''}
                onChange={(e) => setSearch({ priority: e.target.value as any })}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3"
              >
                <option value="" disabled>
                  Select priority
                </option>
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100">Cancel</button>
              <button onClick={onContinue} className="rounded-lg bg-brand.primary px-5 py-2 font-medium text-white hover:bg-blue-600">Continue</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}