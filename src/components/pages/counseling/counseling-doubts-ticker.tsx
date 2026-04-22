type Props = { doubts: string[] };

export function CounselingDoubtsTicker({ doubts }: Props) {
  const doubled = [...doubts, ...doubts];

  return (
    <div className="overflow-hidden border-y border-primary/25 bg-primary/8 py-3">
      <div className="flex animate-marquee-left gap-8 whitespace-nowrap">
        {doubled.map((doubt, i) => (
          <span key={i} className="flex shrink-0 items-center gap-3 text-sm font-semibold text-primary/90">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {doubt}
          </span>
        ))}
      </div>
    </div>
  );
}
