'use client';

interface MilestoneProps {
  label: string
  stat: string
  statLabel: string
  title: string
  subtitle?: string
  portrait?: string
  date: string
  source: string
}

export default function Milestone({ 
  label, 
  stat, 
  statLabel, 
  title, 
  subtitle,
  portrait, 
  date, 
  source 
}: MilestoneProps) {
  return (
    <div className="relative w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
      
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
          {label}
        </div>
        <h2 className="text-white text-2xl sm:text-3xl font-bold uppercase tracking-wide">
          {title}
        </h2>
        {subtitle && (
          <p className="text-neutral-500 text-sm mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {/* Main content - centered stack */}
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="text-amber-400 text-8xl sm:text-9xl font-black">
          {stat}
        </div>
        <div className="text-white text-xl sm:text-2xl font-bold uppercase tracking-widest mt-2">
          {statLabel}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 sm:mt-8 pt-4 border-t border-neutral-800">
        <div className="text-xs uppercase tracking-wide text-neutral-600 text-right">
          {source} • {date}
        </div>
      </div>

      {/* Portrait overlay - bottom LEFT corner */}
      {portrait && (
        <img
          src={portrait}
          alt=""
          className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 object-contain object-bottom"
        />
      )}
    </div>
  )
}