import FiltersSidebar from '../sections/FiltersSidebar';
import OffersList from '../sections/OffersList';

export default function ResultsPage() {
  return (
    <div className="mx-auto max-w-6xl gap-6 p-6 md:grid md:grid-cols-[280px_1fr]">
      <div>
        <FiltersSidebar />
      </div>
      <div>
        <OffersList />
      </div>
    </div>
  );
}