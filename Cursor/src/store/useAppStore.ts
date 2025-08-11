import { create } from 'zustand';
import type { ProcedureId } from '../data/procedures';
import type { PriorityOption } from '../utils/pricingRules';

export interface BudgetChoice {
  label: string;
  range: [number, number] | null; // null means 50,000+
}

export interface FilterState {
  priceRange: [number, number] | null;
  accreditations: { jci: boolean; iso: boolean; local: boolean };
  hospitalTypes: { private: boolean; public: boolean; specialty: boolean };
  languages: Record<string, boolean>;
  packageIncludes: { hotel: boolean; transfers: boolean; followup: boolean };
}

export interface SearchState {
  procedure: ProcedureId | null;
  countryCode: string | 'ALL';
  budget: BudgetChoice | null;
  priority: PriorityOption | null;
}

export interface HospitalSummary {
  id: string;
  name: string;
  countryCode: string;
}

interface AppState {
  search: SearchState;
  filters: FilterState;
  favorites: Record<string, boolean>;
  compare: string[];
  priceAlerts: { procedure: ProcedureId; range: [number, number] | null }[];
  setSearch: (partial: Partial<SearchState>) => void;
  setFilters: (partial: Partial<FilterState>) => void;
  toggleFavorite: (hospitalId: string) => void;
  toggleCompare: (hospitalId: string) => void;
  addPriceAlert: (procedure: ProcedureId, range: [number, number] | null) => void;
  removePriceAlert: (procedure: ProcedureId) => void;
  resetFilters: () => void;
}

const STORAGE_KEY = 'medtour-app-state-v1';

function loadState(): Partial<AppState> | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function saveState(state: AppState) {
  try {
    const toSave: Partial<AppState> = {
      favorites: state.favorites,
      compare: state.compare,
      priceAlerts: state.priceAlerts,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // ignore
  }
}

const defaultFilters: FilterState = {
  priceRange: null,
  accreditations: { jci: false, iso: false, local: false },
  hospitalTypes: { private: false, public: false, specialty: false },
  languages: { English: false, Spanish: false, German: false, French: false },
  packageIncludes: { hotel: false, transfers: false, followup: false },
};

export const useAppStore = create<AppState>((set, _get) => ({
  search: { procedure: null, countryCode: 'ALL', budget: null, priority: null },
  filters: defaultFilters,
  favorites: (loadState()?.favorites as Record<string, boolean>) || {},
  compare: (loadState()?.compare as string[]) || [],
  priceAlerts: (loadState()?.priceAlerts as AppState['priceAlerts']) || [],
  setSearch: (partial) => set((s) => ({ search: { ...s.search, ...partial } })),
  setFilters: (partial) => set((s) => ({ filters: { ...s.filters, ...partial } })),
  toggleFavorite: (hospitalId) => set((s) => {
    const next = { ...s.favorites, [hospitalId]: !s.favorites[hospitalId] };
    const newState = { ...s, favorites: next } as AppState;
    saveState(newState);
    return { favorites: next } as Partial<AppState> as any;
  }),
  toggleCompare: (hospitalId) => set((s) => {
    const exists = s.compare.includes(hospitalId);
    const next = exists ? s.compare.filter((id) => id !== hospitalId) : s.compare.length < 3 ? [...s.compare, hospitalId] : s.compare;
    const newState = { ...s, compare: next } as AppState;
    saveState(newState);
    return { compare: next } as Partial<AppState> as any;
  }),
  addPriceAlert: (procedure, range) => set((s) => {
    const next = [...s.priceAlerts.filter((a) => a.procedure !== procedure), { procedure, range }];
    const newState = { ...s, priceAlerts: next } as AppState;
    saveState(newState);
    return { priceAlerts: next } as Partial<AppState> as any;
  }),
  removePriceAlert: (procedure) => set((s) => {
    const next = s.priceAlerts.filter((a) => a.procedure !== procedure);
    const newState = { ...s, priceAlerts: next } as AppState;
    saveState(newState);
    return { priceAlerts: next } as Partial<AppState> as any;
  }),
  resetFilters: () => set({ filters: defaultFilters }),
}));