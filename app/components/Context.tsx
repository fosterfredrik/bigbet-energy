interface ContextProps {
  label: string
  title: string
  body: string
  date: string
  source: string
}

export default function Context({ label, title, body, date, source }: ContextProps) {
  
  // Parse [[highlighted]] text
  const renderBody = (text: string) => {
    const parts = text.split(/\[\[|\]\]/)
    return parts.map((part, index) => {
      // Odd indices are the highlighted parts (between [[ and ]])
      if (index % 2 === 1) {
        return (
          <span 
            key={index} 
            className="underline decoration-amber-400 decoration-4 underline-offset-4"
          >
            {part}
          </span>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
      
      {/* Label */}
      <div className="mb-2">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#E5B94E' }}>
          {label}
        </span>
      </div>

      {/* Title - secondary now */}
      <div className="mb-8">
        <h2 className="text-neutral-500 text-lg sm:text-xl font-bold uppercase tracking-wide">
          {title}
        </h2>
      </div>

      {/* Body - THE MAIN EVENT */}
      <div className="flex-1 flex items-center">
        <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
          {renderBody(body)}
        </p>
      </div>

    </div>
  )
}