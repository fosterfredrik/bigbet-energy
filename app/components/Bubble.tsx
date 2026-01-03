interface BubbleProps {
  label: string
  title: string
  subtitle?: string
  value: number
  context?: string
  date: string
  source: string
  portrait: string
}

export default function Bubble({ label, title, subtitle, value, context, date, source, portrait }: BubbleProps) {
  return (
    <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
      
      {/* 2x2 Grid */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2">
        
        {/* Top left: Label, Title, Subtitle - bordered */}
        <div className="flex flex-col justify-center p-4 border-r border-b border-amber-400/50">
          <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
            {label}
          </div>
          <h2 className="text-white text-xl sm:text-2xl font-bold uppercase tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="text-neutral-500 text-sm mt-2">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Top right: Value */}
        <div className="flex items-center justify-center p-4">
          <div className="text-amber-400 text-5xl sm:text-6xl font-black">
            {value}%
          </div>
        </div>
        
        {/* Bottom left: Context - gold text */}
        <div className="flex items-center p-4">
          {context && (
            <p className="text-sm leading-relaxed" style={{ color: '#E5B94E' }}>
              {context}
            </p>
          )}
        </div>
        
        {/* Bottom right: Portrait - square, fills quadrant */}
        <div className="overflow-hidden">
          <img 
            src={portrait} 
            alt="" 
            className="w-full h-full object-cover object-top"
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