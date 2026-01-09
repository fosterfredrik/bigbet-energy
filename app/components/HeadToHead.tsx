interface TeamProps {
  name: string
  image: string
  wins: number
}

interface HeadToHeadProps {
  label: string
  title: string
  subtitle?: string
  leftTeam: TeamProps
  rightTeam: TeamProps
  draws: number
  date: string
  source: string
}

export default function HeadToHead({ label, title, subtitle, leftTeam, rightTeam, draws, date, source }: HeadToHeadProps) {
  const leftWins = leftTeam.wins > rightTeam.wins
  const rightWins = rightTeam.wins > leftTeam.wins

  return (
    <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
          {label}
        </div>
        <h2 className="text-white text-2xl sm:text-3xl font-bold uppercase tracking-wide">
          {title}
        </h2>
        {subtitle && (
          <p className="text-neutral-400 text-base mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {/* Teams */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-6 sm:gap-12 mb-8">
          {/* Left Team */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 sm:w-28 sm:h-28 mb-3">
              <img 
                src={leftTeam.image} 
                alt={leftTeam.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className={`text-sm sm:text-base font-bold uppercase tracking-wide ${leftWins ? 'text-amber-400' : 'text-neutral-400'}`}>
              {leftTeam.name}
            </span>
          </div>

          {/* VS */}
          <div className="text-neutral-500 text-lg sm:text-xl font-bold">
            vs
          </div>

          {/* Right Team */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 sm:w-28 sm:h-28 mb-3">
              <img 
                src={rightTeam.image} 
                alt={rightTeam.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className={`text-sm sm:text-base font-bold uppercase tracking-wide ${rightWins ? 'text-amber-400' : 'text-neutral-400'}`}>
              {rightTeam.name}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-end justify-center gap-8 sm:gap-16">
          {/* Left Wins */}
          <div className="flex flex-col items-center">
            <span className={`text-4xl sm:text-5xl font-black ${leftWins ? 'text-amber-400' : 'text-white'}`}>
              {leftTeam.wins}
            </span>
            <span className="text-neutral-400 text-sm uppercase tracking-wide mt-1">
              Wins
            </span>
          </div>

          {/* Draws */}
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-black text-neutral-500">
              {draws}
            </span>
            <span className="text-neutral-400 text-sm uppercase tracking-wide mt-1">
              Draws
            </span>
          </div>

          {/* Right Wins */}
          <div className="flex flex-col items-center">
            <span className={`text-4xl sm:text-5xl font-black ${rightWins ? 'text-amber-400' : 'text-white'}`}>
              {rightTeam.wins}
            </span>
            <span className="text-neutral-400 text-sm uppercase tracking-wide mt-1">
              Wins
            </span>
          </div>
        </div>
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