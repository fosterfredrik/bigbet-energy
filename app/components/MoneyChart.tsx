interface MoneyItem {
  label: string
  value: number
  unit: string
}

interface MoneyChartProps {
  title: string
  subtitle?: string
  date: string
  source: string
  items: MoneyItem[]
  currency?: string
}

export default function MoneyChart({ title, subtitle, date, source, items, currency = '$' }: MoneyChartProps) {
  const maxValue = Math.max(...items.map(i => i.value))
  
  // Auto-size based on number of items
  const gapSize = items.length <= 3 ? 'gap-5 sm:gap-6' : 'gap-3 sm:gap-4'
  const textSize = items.length <= 3 ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
  const barHeight = items.length <= 3 ? 'h-7 sm:h-8' : 'h-5 sm:h-6'

  return (
    <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
      
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
          Money Breakdown
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

      {/* Money Items */}
      <div className={`flex-1 flex flex-col justify-center ${gapSize}`}>
        {items.map((item, index) => {
          const isMax = item.value === maxValue
          const barWidth = (item.value / maxValue) * 100

          return (
            <div key={index}>
              <div className="text-neutral-500 text-xs font-bold uppercase tracking-wide mb-2">
                {item.label}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className={`flex-1 ${barHeight} bg-neutral-900 rounded overflow-hidden`}>
                  <div 
                    className={`h-full rounded ${isMax ? 'bg-amber-400' : 'bg-neutral-700'}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <div className={`font-bold sm:min-w-[90px] sm:text-right ${textSize} ${isMax ? 'text-amber-400' : 'text-white'}`}>
                  {currency}{item.value}{item.unit}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mt-6 sm:mt-8 pt-4 border-t border-neutral-800">
        <div className="text-neutral-600 text-xs uppercase tracking-wide">
          {source} • {date}
        </div>
      </div>
    </div>
  )
}