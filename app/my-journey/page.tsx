import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserCompanions, getUserSessions } from '@/lib/actions/companion.actions';
import Image from 'next/image';
import CompanionsList from '@/components/CompanionsList';

const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);

  return (
    <main>
      {/* Profile header */}
      <section className="flex justify-between gap-6 max-sm:flex-col items-center">
        <div className="flex gap-5 items-center">
          <div className="relative">
            <Image
              src={user.imageUrl}
              alt={user.firstName!}
              width={72}
              height={72}
              className="rounded-2xl"
              style={{ boxShadow: '0 0 30px rgba(168,85,247,0.25)' }}
            />
            <div
              className="absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                boxShadow: '0 0 12px rgba(168,85,247,0.5)',
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.95)' }}>
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {[
            {
              value: sessionHistory.length,
              label: 'Lessons Done',
              color: '#a855f7',
              glow: 'rgba(168,85,247,0.2)',
            },
            {
              value: companions.length,
              label: 'Companions',
              color: '#22d3ee',
              glow: 'rgba(34,211,238,0.15)',
            },
          ].map(({ value, label, color, glow }) => (
            <div key={label} className="stat-card" style={{ borderColor: `${color}20` }}>
              <p
                className="text-3xl font-bold"
                style={{
                  color,
                  textShadow: `0 0 20px ${glow}`,
                }}
              >
                {value}
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Accordions */}
      <Accordion type="multiple" className="flex flex-col gap-3">
        {[
          {
            value: 'recent',
            label: 'Recent Sessions',
            count: sessionHistory.length,
            companions: sessionHistory,
          },
          {
            value: 'companions',
            label: 'My Companions',
            count: companions.length,
            companions: companions,
          },
        ].map(({ value, label, count, companions: list }) => (
          <AccordionItem
            key={value}
            value={value}
            className="rounded-2xl px-5"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <AccordionTrigger
              className="text-sm font-semibold hover:no-underline py-4 gap-3"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              <span className="flex items-center gap-3">
                {label}
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{ background: 'rgba(168,85,247,0.12)', color: '#c084fc' }}
                >
                  {count}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <CompanionsList title="" companions={list} classNames="border-0 p-0 bg-transparent" />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default Profile;
