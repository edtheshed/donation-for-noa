import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function AboutSection() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content/about.md'), 'utf-8');
  const { data, content } = matter(raw);

  const paragraphs = content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="max-w-3xl mx-auto px-6 py-14">
      <h2
        className="text-warm-ink text-center mb-10"
        style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontWeight: 600 }}
      >
        {data.title}
      </h2>

      <div className="space-y-5 mb-10">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-warm-muted leading-relaxed"
            style={{ fontFamily: 'var(--font-lora)', fontSize: '1rem' }}
          >
            {p}
          </p>
        ))}
      </div>

      {data.image && (
        <div className="rounded-2xl overflow-hidden border border-warm-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt=""
            className="w-full h-auto block"
          />
        </div>
      )}
    </section>
  );
}
