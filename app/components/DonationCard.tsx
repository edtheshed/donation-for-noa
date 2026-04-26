import Image from 'next/image';
import type { Donation } from '@/types/donation';

function BloodDrop({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5C9.5 7 5.5 11.5 5.5 15.5a6.5 6.5 0 0013 0c0-4-4-8.5-6.5-13z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

interface Props {
  donation: Donation;
  index: number;
}

export function DonationCard({ donation, index }: Props) {
  const stagger = `stagger-${Math.min(index + 1, 4)}`;

  return (
    <article
      className={`animate-fade-up ${stagger} bg-white rounded-2xl overflow-hidden shadow-sm border border-warm-border hover:shadow-md transition-shadow duration-300 flex flex-col`}
    >
      {donation.photo_url ? (
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={donation.photo_url}
            alt={`Photo from ${donation.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="h-1 bg-crimson w-full" />
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-warm-ink leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.45rem', fontWeight: 600 }}
          >
            {donation.name}
          </h3>
          <BloodDrop className="w-4 h-4 text-crimson flex-shrink-0 mt-1" />
        </div>

        <div className="flex flex-col gap-1.5 text-sm text-warm-muted">
          <div className="flex items-center gap-2">
            <CalendarIcon />
            <span>{formatDate(donation.donated_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <PinIcon />
            <span className="line-clamp-1">{donation.location}</span>
          </div>
        </div>

        {donation.message && (
          <blockquote
            className="text-warm-muted text-sm leading-relaxed italic border-l-2 border-crimson-mid pl-3 mt-1"
            style={{ fontFamily: 'var(--font-lora)' }}
          >
            &ldquo;{donation.message}&rdquo;
          </blockquote>
        )}
      </div>
    </article>
  );
}
