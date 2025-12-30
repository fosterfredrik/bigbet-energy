interface BubbleProps {
    label: string
    name: string
    tagline: string
    value: number
    date: string
    source: string
    portrait: string
  }
  
  export default function Bubble({ label, name, tagline, value, date, source, portrait }: BubbleProps) {
    return (
      <div className="w-full h-full bg-amber-400 p-6 sm:p-10 md:p-12 flex flex-col">
        
        {/* Label */}
        <div className="text-center mb-4">
          <span className="text-xs font-bold tracking-widest uppercase text-black/60">
            {label}
          </span>
        </div>
  
        {/* Portrait + Percentage */}
        <div className="flex-1 flex items-center justify-center gap-6 sm:gap-8">
          {/* Portrait bubble */}
          <div className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden border-4 border-black">
            <img 
              src={portrait} 
              alt="" 
              className="w-full h-full object-cover object-top"
            />
          </div>
  
          {/* Percentage */}
          <div className="text-black text-6xl sm:text-7xl font-bold">
            {value}%
          </div>
        </div>
  
        {/* Name + Tagline */}
        <div className="text-center mt-4">
          <h2 className="text-black text-2xl sm:text-3xl font-bold uppercase tracking-wide">
            {name}
          </h2>
          <p className="text-black/60 text-sm sm:text-base mt-1">
            {tagline}
          </p>
        </div>
  
        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-black/20">
          <div className="text-black/50 text-xs uppercase tracking-wide text-center">
            {source} • {date}
          </div>
        </div>
      </div>
    )
  }
  