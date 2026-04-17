import Image from 'next/image';
import Link from 'next/link';

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({ id, name, topic, subject, duration, color }: CompanionCardProps) => (
  <article className="companion-card group">
    {/* Subject icon */}
    <div className="flex justify-between items-start">
      <div
        className="size-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
          border: `1px solid ${color}33`,
          boxShadow: `0 0 20px ${color}15`,
        }}
      >
        <Image src={`/icons/${subject}.svg`} alt={subject} width={22} height={22} />
      </div>
      <div className="subject-badge">{subject}</div>
    </div>

    {/* Info */}
    <div className="flex flex-col gap-1.5 flex-1">
      <h2
        className="text-base font-bold leading-tight transition-colors duration-200 group-hover:text-white"
        style={{ color: 'rgba(255,255,255,0.9)' }}
      >
        {name}
      </h2>
      <p
        className="text-sm leading-relaxed line-clamp-2"
        style={{ color: 'rgba(255,255,255,0.45)' }}
      >
        {topic}
      </p>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pt-1">
      <div className="flex items-center gap-1.5">
        <div
          className="size-1.5 rounded-full"
          style={{ background: `${color}`, boxShadow: `0 0 6px ${color}` }}
        />
        <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {duration} min
        </span>
      </div>

      <Link href={`/companions/${id}`}>
        <button className="btn-primary text-xs px-4 py-2">Launch →</button>
      </Link>
    </div>
  </article>
);

export default CompanionCard;
