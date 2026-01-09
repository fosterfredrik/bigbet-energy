interface ProgressRingProps {
  label: string
  category?: string
  value: number
  subtitle?: string
  date: string
  source: string
  portrait?: string
}

export default function ProgressRing({ label, category = "Market Probability", value, subtitle, date, source, portrait }: ProgressRingProps) {
  const radius = 100
  const stroke = 10
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (value / 100) * circumference

  const titleSize = label.length < 25 
    ? 'text-2xl sm:text-3xl' 
    : 'text-xl sm:text-2xl'

  return (
    <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
      {/* Header - centered */}
      <div className="text-center mb-4">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
          {category}
        </div>
        <h2 className={`text-white font-bold uppercase tracking-wide ${titleSize}`}>
          {label}
        </h2>
      </div>

      {/* Ring + Badge */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-6">
          <div className="relative">
            <svg 
              height={radius * 2} 
              width={radius * 2}
              className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px]"
              viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            >
              <circle
                stroke="#1a1a1a"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                className="stroke-amber-400"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                transform={`rotate(-90 ${radius} ${radius})`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              {portrait ? (
                <div className="w-[160px] h-[160px] sm:w-[190px] sm:h-[190px] rounded-full overflow-hidden">
                  <img 
                    src={portrait} 
                    alt="" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : (
                <span className="text-white text-5xl sm:text-6xl font-bold">
                  {value}%
                </span>
              )}
            </div>
          </div>

          {portrait && (
            <div className="bg-amber-400 text-black font-bold text-3xl sm:text-4xl px-5 py-3 rounded-full">
              {value}%
            </div>
          )}
        </div>

        {/* Subtitle - below ring */}
        {subtitle && (
          <p className="text-neutral-400 text-base mt-6 text-center max-w-[280px]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-neutral-800">
        <div className="text-neutral-500 text-sm uppercase tracking-wide text-center">
          {source} • {date}
        </div>
      </div>
    </div>
  )
}