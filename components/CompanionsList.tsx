import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, getSubjectColor } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => (
  <article className={cn('companion-list', classNames)}>
    {title && (
      <h2 className="font-bold text-lg mb-5" style={{ color: 'rgba(255,255,255,0.9)' }}>
        {title}
      </h2>
    )}

    <Table>
      <TableHeader>
        <TableRow style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <TableHead
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Lesson
          </TableHead>
          <TableHead
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Subject
          </TableHead>
          <TableHead
            className="text-xs font-semibold tracking-widest uppercase text-right"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Duration
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companions?.filter(Boolean).map(({ id, subject, name, topic, duration }) => {
          const color = getSubjectColor(subject);
          return (
            <TableRow
              key={id}
              style={{ borderColor: 'rgba(255,255,255,0.04)' }}
              className="group transition-all duration-200 hover:bg-white/[0.02]"
            >
              <TableCell>
                <Link href={`/companions/${id}`}>
                  <div className="flex items-center gap-3">
                    <div
                      className="size-9 flex items-center justify-center rounded-lg shrink-0 max-md:hidden transition-transform duration-200 group-hover:scale-110"
                      style={{
                        background: `${color}15`,
                        border: `1px solid ${color}25`,
                      }}
                    >
                      <Image src={`/icons/${subject}.svg`} alt={subject} width={18} height={18} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p
                        className="font-semibold text-sm transition-colors duration-200 group-hover:text-white"
                        style={{ color: 'rgba(255,255,255,0.8)' }}
                      >
                        {name}
                      </p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {topic}
                      </p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div className="subject-badge w-fit max-md:hidden">{subject}</div>
                <div
                  className="flex items-center justify-center rounded-lg w-fit p-1.5 md:hidden"
                  style={{ background: `${color}15` }}
                >
                  <Image src={`/icons/${subject}.svg`} alt={subject} width={14} height={14} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 w-full justify-end">
                  <div
                    className="size-1.5 rounded-full"
                    style={{ background: color, boxShadow: `0 0 5px ${color}` }}
                  />
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {duration}
                    <span className="max-md:hidden"> min</span>
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </article>
);

export default CompanionsList;
