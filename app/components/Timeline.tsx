'use client';

interface TimelineEvent {
  year: string;
  label: string;
  description?: string;
  highlight?: boolean;
}

interface TimelineProps {
  label?: string;
  title: string;
  subtitle?: string;
  date: string;
  source: string;
  events: TimelineEvent[];
}

export default function Timeline({ 
  label = "The Journey", 
  title, 
  subtitle, 
  date, 
  source, 
  events 
}: TimelineProps) {
  return (
    <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
          {label}
        </div>
        <h2 className="text-white text-2xl sm:text-3xl font-bold uppercase tracking-wide">
          {title}
        </h2>
        {subtitle && (
          <p className="text-neutral-400 text-base mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {/* Timeline */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="relative">
          {/* Vertical connecting line */}
          <div 
            className="absolute left-[72px] top-1 bottom-1 w-0.5 bg-neutral-800"
          />
          
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-4 mb-3 last:mb-0 relative">
              {/* Year */}
              <div className="w-14 text-right">
                <span 
                  className={`text-sm font-bold ${event.highlight ? 'text-amber-400' : 'text-neutral-500'}`}
                >
                  {event.year}
                </span>
              </div>

              {/* Dot */}
              <div 
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 relative z-10 ${
                  event.highlight 
                    ? 'bg-amber-400 ring-4 ring-amber-400/20' 
                    : 'bg-neutral-600'
                }`}
              />

              {/* Content - inline */}
              <div className="flex-1 flex items-baseline gap-2">
                <span 
                  className={`font-bold text-sm ${event.highlight ? 'text-amber-400' : 'text-neutral-300'}`}
                >
                  {event.label}
                </span>
                {event.description && (
                  <span className="text-neutral-500 text-sm">
                    — {event.description}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-neutral-800">
        <div className="text-neutral-500 text-sm uppercase tracking-wide">
          {source} • {date}
        </div>
      </div>
    </div>
  );
}
