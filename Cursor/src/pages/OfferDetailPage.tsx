import { useParams } from 'react-router-dom';
import { sampleOffers } from '../data/sampleOffers';
import { useAppStore } from '../store/useAppStore';

export default function OfferDetailPage() {
  const { id } = useParams();
  const offer = sampleOffers.find((o) => o.id === id);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const toggleCompare = useAppStore((s) => s.toggleCompare);
  const addPriceAlert = useAppStore((s) => s.addPriceAlert);
  const search = useAppStore((s) => s.search);

  if (!offer) return <div className="p-6">Offer not found.</div>;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-4 text-2xl font-semibold text-slate-800">{offer.hospitalName}</div>
      <div className="mb-6 text-slate-600">{offer.city}, {offer.countryCode} • ⭐ {offer.rating.toFixed(1)} ({offer.reviews} reviews)</div>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-2 text-lg font-semibold">Price Breakdown</div>
        <div className="text-sm">
          <div>💰 TOTAL PACKAGE: ${(offer.startingFrom + 1500).toLocaleString()}</div>
          <div>✅ Surgery: ${(offer.startingFrom).toLocaleString()}</div>
          <div>✅ Hospital stay (3 nights): $600</div>
          <div>✅ Accommodation (5 nights): $500</div>
          <div>✅ Airport transfers: $120</div>
          <div>✅ Pre-op tests: $200</div>
          <div>✅ Follow-up consultation: $120</div>
          <div>❌ Flights: Not included</div>
          <div>❌ Meals: $35/day extra</div>
        </div>
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 text-lg font-semibold">Hospital Information</div>
          <div className="text-sm">
            <div>Accreditations: {offer.accreditations.join(', ')} <a className="text-brand.primary" href="#">Verify</a></div>
            <div>Founded: 2008 • 17 years of operation</div>
            <div>Surgeries/year: 2,400+</div>
            <div>Success rate: 96% for this procedure</div>
            <div>Languages: 🇬🇧 English, 🇪🇸 Spanish, 🇩🇪 German</div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 text-lg font-semibold">Lead Surgeon</div>
          <div className="text-sm">
            <div>👨‍⚕️ Dr. Alex Marin, MD</div>
            <div>🎓 University of Health Sciences • Orthopedics</div>
            <div>📅 15 years experience</div>
            <div>🏥 1,200+ surgeries performed</div>
            <div>🗣️ Fluent: English, Spanish</div>
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-2 text-lg font-semibold">Patient Reviews</div>
        <div className="space-y-3 text-sm">
          <div>⭐️⭐️⭐️⭐️⭐️ “Excellent care and clean facilities” — <span className="text-slate-500">Jan 2025</span></div>
          <div>⭐️⭐️⭐️⭐️ “Great communication and results” — <span className="text-slate-500">Mar 2025</span></div>
          <div>⭐️⭐️⭐️⭐️ “Airport pickup and hotel were seamless” — <span className="text-slate-500">Apr 2025</span></div>
        </div>
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 text-lg font-semibold">Logistics Support</div>
          <ul className="list-disc pl-6 text-sm">
            <li>Visa assistance provided</li>
            <li>Airport pickup included</li>
            <li>Partner hotels: 4 and 5-star options</li>
            <li>Recovery support: nursing and physiotherapy</li>
            <li>24/7 interpreter services</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 text-lg font-semibold">Actions</div>
          <div className="flex flex-wrap gap-2 text-sm">
            <button onClick={() => toggleFavorite(offer.id)} className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">Save to favorites</button>
            <button onClick={() => toggleCompare(offer.id)} className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">Add to compare</button>
            <button onClick={() => search.procedure && addPriceAlert(search.procedure, search.budget?.range || null)} className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">Set price alert</button>
            <button className="rounded-lg bg-brand.primary px-4 py-2 text-white hover:bg-blue-600">Contact clinic</button>
          </div>
        </div>
      </section>
    </div>
  );
}