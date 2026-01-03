interface GaugeProps {
  label: string
  title: string
  subtitle?: string
  value: number
  context?: string
  date: string
  source: string
  portrait?: string
}

export default function Gauge({ label, title, subtitle, value, context, date, source, portrait }: GaugeProps) {
  const needleAngle = -90 + (value / 100) * 180

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
          <p className="text-neutral-500 text-sm mt-2">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Gauge with clipped portrait */}
      <div className="flex-1 flex flex-col items-center justify-center">
        
        <div className="relative w-[280px] h-[160px] sm:w-[320px] sm:h-[180px]">
          
          <svg 
            viewBox="0 0 200 110"
            className="absolute inset-0 w-full h-full"
          >
            {/* Define clip path - semi-circle inside the arc */}
            <defs>
              <clipPath id="gaugeClip">
                <path d="M 20 100 A 80 80 0 0 1 180 100 L 180 110 L 20 110 Z" />
              </clipPath>
            </defs>
            
            {/* Portrait image - clipped to semi-circle */}
            {portrait && (
              <image
                href={portrait}
                x="10"
                y="5"
                width="180"
                height="105"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#gaugeClip)"
              />
            )}
            
            {/* Background arc */}
            <path
              d="M 15 100 A 85 85 0 0 1 185 100"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="10"
            />
            {/* Progress arc */}
            <path
              d="M 15 100 A 85 85 0 0 1 185 100"
              fill="none"
              stroke="#E5B94E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${(value / 100) * 267} 267`}
            />
            {/* Needle */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="20"
              stroke="#E5B94E"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${needleAngle} 100 100)`}
            />
            {/* Center dot */}
            <circle cx="100" cy="100" r="6" fill="#E5B94E" />
          </svg>
        </div>
        
        {/* Labels */}
        <div className="flex justify-between w-[280px] sm:w-[320px] mt-2 px-4">
          <span className="text-neutral-600 text-xs">0%</span>
          <span className="text-amber-400 text-2xl font-black">{value}%</span>
          <span className="text-neutral-600 text-xs">100%</span>
        </div>
        
        {/* Context */}
        {context && (
          <p className="text-sm mt-4 text-center max-w-[280px]" style={{ color: '#E5B94E' }}>
            {context}
          </p>
        )}
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