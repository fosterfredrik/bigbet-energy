interface DonutItem {
    label: string
    value: number
  }
  
  interface DonutProps {
    title: string
    date: string
    source: string
    items: DonutItem[]
  }
  
  export default function Donut({ title, date, source, items }: DonutProps) {
    const total = items.reduce((sum, item) => sum + item.value, 0)
    const radius = 90
    const stroke = 28
    const normalizedRadius = radius - stroke / 2
    const circumference = normalizedRadius * 2 * Math.PI
  
    // Auto-size based on number of items
    const legendTextSize = items.length <= 4 ? 'text-sm' : 'text-xs'
  
    // Calculate segments
    let currentOffset = 0
    const segments = items.map((item, index) => {
      const percentage = item.value / total
      const segmentLength = percentage * circumference
      const offset = currentOffset
      currentOffset += segmentLength
      
      const maxValue = Math.max(...items.map(i => i.value))
      const isHighlight = item.value === maxValue
      
      return { ...item, percentage, segmentLength, offset, isHighlight }
    })
  
    return (
      <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-4">
          <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
            Market Breakdown
          </div>
          <h2 className="text-white text-2xl sm:text-3xl font-bold uppercase tracking-wide">
            {title}
          </h2>
        </div>
  
        {/* Donut + Legend */}
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          
          {/* Donut */}
          <div className="relative">
            <svg 
              height={radius * 2} 
              width={radius * 2}
              className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px]"
              viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            >
              {segments.map((segment, index) => (
                <circle
                  key={index}
                  className={segment.isHighlight ? 'stroke-amber-400' : index === 1 ? 'stroke-neutral-600' : 'stroke-neutral-800'}
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={`${segment.segmentLength} ${circumference - segment.segmentLength}`}
                  strokeDashoffset={-segment.offset}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  transform={`rotate(-90 ${radius} ${radius})`}
                />
              ))}
            </svg>
          </div>
  
          {/* Legend */}
          <div className="flex flex-row flex-wrap sm:flex-col justify-center gap-3 sm:gap-4">
            {segments.map((segment, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3">
                <div 
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${segment.isHighlight ? 'bg-amber-400' : index === 1 ? 'bg-neutral-600' : 'bg-neutral-800'}`}
                />
                <div>
                  <div className={`font-bold ${legendTextSize} ${segment.isHighlight ? 'text-white' : 'text-neutral-500'}`}>
                    {segment.value}%
                  </div>
                  <div className="text-xs text-neutral-600">
                    {segment.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mt-4 pt-4 border-t border-neutral-800">
          <div className="text-neutral-600 text-xs uppercase tracking-wide">
            {source} • {date}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">⚡</span>
            <span className="text-sm font-bold tracking-wide" style={{ color: '#E5B94E' }}>
              BIGBET.ENERGY
            </span>
          </div>
        </div>
      </div>
    )
  }