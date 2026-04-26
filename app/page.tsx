export const dynamic = 'force-dynamic';

import { getDonations } from '@/app/actions';
import { DonationCard } from '@/app/components/DonationCard';
import { DonationForm } from '@/app/components/DonationForm';

function BloodDrop({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5C9.5 7 5.5 11.5 5.5 15.5a6.5 6.5 0 0013 0c0-4-4-8.5-6.5-13z" />
    </svg>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 my-14">
      <div className="flex-1 h-px bg-warm-border" />
      <BloodDrop className="w-3.5 h-3.5 text-crimson opacity-50" />
      <div className="flex-1 h-px bg-warm-border" />
    </div>
  );
}

export default async function Home() {
  const donations = await getDonations();

  return (
    <div className="min-h-screen bg-cream">
      {/* Crimson accent bar */}
      <div className="h-1 bg-crimson w-full" />

      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 py-7 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BloodDrop className="w-6 h-6 text-crimson" />
          <span
            className="text-warm-ink tracking-widest text-xs uppercase font-medium"
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.9rem', letterSpacing: '0.16em' }}
          >
            Blood Donation Registry
          </span>
        </div>
        <span className="text-warm-muted text-sm">
          {donations.length} donation{donations.length !== 1 ? 's' : ''} recorded
        </span>
      </header>

      {/* Hero */}
      <section className="max-w-2xl mx-auto px-6 pt-6 pb-14 text-center">
        <h1
          className="text-warm-ink mb-6 leading-none"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 600,
            lineHeight: 1.05,
          }}
        >
          Every drop
          <br />
          <em>counts.</em>
        </h1>
        <p
          className="text-warm-muted leading-relaxed"
          style={{ fontFamily: 'var(--font-lora)', fontSize: '1rem' }}
        >
          A record of everyone who has donated blood.
          Each donation is a gift of life.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <Divider />

        {/* Donations feed */}
        <section className="mb-4">
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
              <BloodDrop className="w-10 h-10 mx-auto mb-4 opacity-20" />
              <p style={{ fontFamily: 'var(--font-lora)' }}>
                No donations recorded yet. Be the first.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {donations.map((donation, i) => (
                <DonationCard key={donation.id} donation={donation} index={i} />
              ))}
            </div>
          )}
        </section>

        <Divider />

        {/* Registration form */}
        <section className="max-w-md mx-auto mb-20">
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
      </div>

      {/* Footer */}
      <footer className="border-t border-warm-border py-7">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-2 text-warm-muted text-sm">
          <BloodDrop className="w-3.5 h-3.5 text-crimson opacity-50" />
          <span style={{ fontFamily: 'var(--font-lora)' }}>Blood Donation Registry</span>
        </div>
      </footer>
    </div>
  );
}
