import CompanionForm from '@/components/CompanionForm';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  return (
    <main style={{ maxWidth: '680px' }}>
      <div className="flex flex-col gap-2">
        <div
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1 w-fit mb-1"
          style={{
            background: 'rgba(168,85,247,0.08)',
            color: '#c084fc',
            border: '1px solid rgba(168,85,247,0.18)',
          }}
        >
          ✦ Builder
        </div>
        <h1 className="text-3xl font-bold" style={{ color: 'rgba(255,255,255,0.95)' }}>
          New <span className="text-gradient-static">Companion</span>
        </h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Configure your AI tutor — name it, set the subject, and choose a voice style.
        </p>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <CompanionForm />
      </div>
    </main>
  );
};

export default NewCompanion;
