interface ProgressBarProps {
    label: string
    subtitle?: string
    value: number
    date: string
    source: string
  }
  
  export default function ProgressBar({ label, subtitle, value, date, source }: ProgressBarProps) {
    return (
      <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
        
        {/* Header */}
        <div className="mb-6">
          <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
            Progress
          </div>
          <h2 className="text-white text-2xl sm:text-3xl font-bold uppercase tracking-wide">
            {label}
          </h2>
          {subtitle && (
            <p className="text-neutral-500 text-sm mt-2">
              {subtitle}
            </p>
          )}
        </div>
  
        {/* Bar + Percentage */}
        <div className="flex-1 flex flex-col justify-center gap-4">
          {/* Percentage */}
          <div className="text-amber-400 text-6xl sm:text-7xl font-bold">
            {value}%
          </div>
          
          {/* Bar */}
          <div className="w-full h-6 sm:h-8 bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-400 rounded-full"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
  
        {/* Footer */}
        <div className="pt-4 border-t border-neutral-800">
          <div className="text-neutral-600 text-xs uppercase tracking-wide text-center">
            {source} • {date}
          </div>
        </div>
      </div>
    )
  }