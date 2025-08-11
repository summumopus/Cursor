import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ResultsPage from './pages/ResultsPage';
import OfferDetailPage from './pages/OfferDetailPage';
import ComparePage from './pages/ComparePage';
import CompareBar from './components/CompareBar';
import LiveChatWidget from './components/LiveChatWidget';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link to="/" className="text-lg font-semibold text-brand.primary">MediCompare</Link>
            <nav className="flex gap-4 text-sm text-slate-600">
              <Link to="/recommendations">Recommendations</Link>
              <Link to="/results">Offers</Link>
              <Link to="/compare">Compare</Link>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/offer/:id" element={<OfferDetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
        <CompareBar />
        <LiveChatWidget />
      </div>
    </BrowserRouter>
  );
}
