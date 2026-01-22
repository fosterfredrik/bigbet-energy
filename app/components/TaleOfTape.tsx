'use client';

interface TapeRow {
  label: string;
  left: string | number;
  right: string | number;
  winner?: 'left' | 'right' | 'draw';
}

interface TaleOfTapeProps {
  label?: string;
  title: string;
  subtitle?: string;
  date: string;
  source: string;
  leftName: string;
  rightName: string;
  leftImage?: string;
  rightImage?: string;
  rows: TapeRow[];
}

export default function TaleOfTape({ 
  label = "Tale of the Tape",
  title, 
  subtitle, 
  date, 
  source, 
  leftName,
  rightName,
  leftImage,
  rightImage,
  rows
}: TaleOfTapeProps) {
  return (
    <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
      {/* Header */}
      <div className="mb-6 text-center">
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

      {/* Fighters / Teams header */}
      <div className="flex items-center justify-between mb-6">
        {/* Left */}
        <div className="flex-1 text-center">
          {leftImage && (
            <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-neutral-900">
              <img src={leftImage} alt={leftName} className="w-full h-full object-cover" />
            </div>
          )}
          <span className="text-amber-400 font-bold text-lg uppercase">{leftName}</span>
        </div>

        {/* VS */}
        <div className="px-4">
          <span className="text-neutral-600 font-black text-2xl">VS</span>
        </div>

        {/* Right */}
        <div className="flex-1 text-center">
          {rightImage && (
            <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-neutral-900">
              <img src={rightImage} alt={rightName} className="w-full h-full object-cover" />
            </div>
          )}
          <span className="text-white font-bold text-lg uppercase">{rightName}</span>
        </div>
      </div>

      {/* Comparison rows */}
      <div className="flex-1 flex flex-col justify-center space-y-3">
        {rows.map((row, index) => (
          <div key={index} className="flex items-center">
            {/* Left value */}
            <div className="flex-1 text-right pr-4">
              <span 
                className={`text-lg font-bold ${
                  row.winner === 'left' ? 'text-amber-400' : 'text-neutral-400'
                }`}
              >
                {row.left}
              </span>
            </div>

            {/* Label */}
            <div className="w-28 text-center">
              <span className="text-neutral-500 text-xs uppercase tracking-wider">
                {row.label}
              </span>
            </div>

            {/* Right value */}
            <div className="flex-1 text-left pl-4">
              <span 
                className={`text-lg font-bold ${
                  row.winner === 'right' ? 'text-amber-400' : 'text-neutral-400'
                }`}
              >
                {row.right}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-neutral-800">
        <div className="text-neutral-500 text-sm uppercase tracking-wide text-center">
          {source} • {date}
        </div>
      </div>
    </div>
  );
}
