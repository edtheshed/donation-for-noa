export const dynamic = 'force-dynamic';

import { getDonations } from '@/app/actions';
import { DonationCard } from '@/app/components/DonationCard';
import { DonationForm } from '@/app/components/DonationForm';
import { StatsSection } from '@/app/components/StatsSection';
import { AboutSection } from '@/app/components/AboutSection';

function Divider() {
  return <div className="h-px bg-warm-border my-2" />;
}

export default async function Home() {
  const donations = await getDonations();

  return (
    <div className="min-h-screen bg-cream">
      {/* Crimson accent bar */}
      <div className="h-1 bg-crimson w-full" />

      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 py-7">
        <span
          className="text-warm-ink tracking-widest text-xs uppercase font-medium"
          style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.9rem', letterSpacing: '0.16em' }}
        >
          Donations for Noa
        </span>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        {/* (i) Stats */}
        <StatsSection donations={donations} />

        <Divider />

        {/* (ii) About */}
        <AboutSection />

        <Divider />

        {/* (iii) Donation form */}
        <section className="max-w-md mx-auto py-14">
          <h2
            className="text-warm-ink text-center mb-2"
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontWeight: 600 }}
          >
            Record your donation
          </h2>
          <p
            className="text-center text-warm-muted text-sm mb-8"
            style={{ fontFamily: 'var(--font-lora)' }}
          >
            Donated blood? Add your name to the list.
          </p>
          <div className="bg-white rounded-2xl shadow-sm border border-warm-border p-7">
            <DonationForm />
          </div>
        </section>

        <Divider />

        {/* (iv) Full donation list */}
        <section className="py-14">
          <h2
            className="text-warm-ink text-center mb-2"
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontWeight: 600 }}
          >
            Those who have given
          </h2>
          <p
            className="text-center text-warm-muted text-sm mb-10"
            style={{ fontFamily: 'var(--font-lora)' }}
          >
            Each record below represents a real act of generosity.
          </p>

          {donations.length === 0 ? (
            <div className="text-center py-16 text-warm-muted">
              <p style={{ fontFamily: 'var(--font-lora)' }}>
                No donations recorded yet. Be the first.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {donations.map((donation, i) => (
                <DonationCard key={donation.id} donation={donation} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-warm-border py-7">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center text-warm-muted text-sm">
          <span style={{ fontFamily: 'var(--font-lora)' }}>Donations for Noa</span>
        </div>
      </footer>
    </div>
  );
}
