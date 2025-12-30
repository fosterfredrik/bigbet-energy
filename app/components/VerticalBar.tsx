interface BarItem {
    label: string
    value: number
    highlight?: boolean
  }
  
  interface VerticalBarProps {
    title: string
    subtitle?: string
    items: BarItem[]
    unit?: string
    date: string
    source: string
  }
  
  export default function VerticalBar({ title, subtitle, items, unit = '', date, source }: VerticalBarProps) {
    const maxValue = Math.max(...items.map(i => i.value))
  
    return (
      <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
        
        {/* Header */}
        <div className="mb-6">
          <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
            By The Numbers
          </div>
          <h2 className="text-white text-xl sm:text-2xl font-bold uppercase tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="text-neutral-500 text-sm mt-1">
              {subtitle}
            </p>
          )}
        </div>
  
        {/* Bars */}
        <div className="flex-1 flex items-end justify-center gap-3 sm:gap-4">
          {items.map((item, index) => {
            const heightPercent = (item.value / maxValue) * 100
            return (
              <div key={index} className="flex flex-col items-center gap-2 flex-1 max-w-[80px]">
                {/* Value */}
                <span className={`text-xs sm:text-sm font-bold ${item.highlight ? 'text-amber-400' : 'text-neutral-500'}`}>
                  {item.value.toLocaleString()}{unit}
                </span>
                
                {/* Bar */}
                <div className="w-full h-[180px] sm:h-[220px] flex items-end">
                  <div 
                    className={`w-full rounded-t ${item.highlight ? 'bg-amber-400' : 'bg-neutral-700'}`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                
                {/* Label */}
                <span className={`text-xs font-bold text-center leading-tight ${item.highlight ? 'text-amber-400' : 'text-neutral-500'}`}>
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
  
        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-neutral-800">
          <div className="text-neutral-600 text-xs uppercase tracking-wide text-center">
            {source} • {date}
          </div>
        </div>
      </div>
    )
  }