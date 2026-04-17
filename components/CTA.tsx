import Link from 'next/link';

const Cta = () => (
  <section className="cta-section">
    <div className="cta-badge">✦ AI-Powered</div>

    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold leading-snug" style={{ color: 'rgba(255,255,255,0.95)' }}>
        Build Your Own
        <br />
        <span className="text-gradient-static">AI Tutor</span>
      </h2>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
        Pick a name, subject &amp; personality — then learn through voice conversations that feel
        natural and fun.
      </p>
    </div>

    <div
      className="w-full h-px"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)',
      }}
    />

    <div className="flex flex-col gap-2 w-full text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
      {['Choose subject & topic', 'Pick voice & style', 'Start talking instantly'].map(
        (step, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="size-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc' }}
            >
              {i + 1}
            </span>
            {step}
          </div>
        )
      )}
    </div>

    <Link href="/companions/new" className="w-full relative z-10">
      <button className="btn-primary w-full justify-center">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Build a Companion
      </button>
    </Link>
  </section>
);

export default Cta;
