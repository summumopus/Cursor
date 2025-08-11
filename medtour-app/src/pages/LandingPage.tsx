import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CountrySelect from '../components/CountrySelect';
import TrustBadges from '../components/TrustBadges';
import PopularSearches from '../components/PopularSearches';
import PreFilterModal from '../components/PreFilterModal';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [openPre, setOpenPre] = useState(false);
  const navigate = useNavigate();

  function handleSearchSubmit() {
    setOpenPre(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-14">
        <div className="mb-8 text-center">
          <div className="text-2xl font-semibold text-slate-800">Find trusted medical treatment abroad</div>
          <div className="mt-1 text-slate-600">Compare clinics, packages, and prices globally</div>
        </div>

        <div className="mx-auto flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row">
          <div className="flex-1">
            <SearchBar onSubmit={handleSearchSubmit} />
          </div>
          <CountrySelect />
          <button
            onClick={handleSearchSubmit}
            className="rounded-xl bg-brand.primary px-6 py-3 font-medium text-white shadow-sm hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        <TrustBadges />

        <PopularSearches onSelect={handleSearchSubmit} />
      </div>

      <PreFilterModal
        open={openPre}
        onClose={() => setOpenPre(false)}
        onContinue={() => {
          setOpenPre(false);
          navigate('/recommendations');
        }}
      />
    </div>
  );
}