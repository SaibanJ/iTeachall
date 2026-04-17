import React from 'react';
import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import CTA from '@/components/CTA';
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import Link from 'next/link';

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="flex flex-col gap-5 pt-6 pb-4">
        <div
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase rounded-full px-4 py-1.5 w-fit"
          style={{
            background: 'rgba(168,85,247,0.08)',
            color: '#c084fc',
            border: '1px solid rgba(168,85,247,0.2)',
          }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ background: '#a855f7', boxShadow: '0 0 8px #a855f7' }}
          />
          Real-Time AI Learning
        </div>

        <h1
          className="text-5xl max-sm:text-3xl font-bold leading-[1.1] tracking-tight max-w-2xl"
          style={{ color: 'rgba(255,255,255,0.95)' }}
        >
          Learn anything with
          <br />
          <span className="text-gradient">your AI tutor</span>
        </h1>

        <p
          className="text-base max-w-lg leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          Voice-powered sessions that actually teach you. Pick a companion, start a conversation,
          and understand — not just memorize.
        </p>

        <div className="flex gap-3 mt-1 flex-wrap">
          <Link href="/companions/new">
            <button className="btn-primary">Build a Companion</button>
          </Link>
          <Link href="/companions">
            <button className="btn-secondary">Browse Library →</button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex gap-6 mt-2 flex-wrap">
          {[
            { label: 'Subjects', value: '9+' },
            { label: 'Voice styles', value: '4' },
            { label: 'Always on', value: '24/7' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold text-gradient-static">{value}</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Companions ── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Popular Companions
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: 'rgba(168,85,247,0.12)', color: '#c084fc' }}
            >
              {companions.length}
            </span>
          </div>
          <Link
            href="/companions"
            className="text-xs font-medium transition-colors flex items-center gap-1"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            View all
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="companions-grid">
          {companions.filter(Boolean).map(companion => (
            <CompanionCard
              color={getSubjectColor(companion.subject)}
              key={companion.id}
              {...companion}
            />
          ))}
        </div>
      </section>

      {/* ── Recent + CTA ── */}
      <section className="home-section">
        <CompanionsList
          title="Recent Sessions"
          companions={recentSessionsCompanions}
          classNames="flex-1"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
