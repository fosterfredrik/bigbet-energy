'use client'
import { useState } from 'react'

interface SourceItem {
  label: string
  url: string
}

interface SourcesProps {
  items: SourceItem[]
}

export default function Sources({ items }: SourcesProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full bg-neutral-900 border-t border-neutral-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-3 flex items-center justify-between text-neutral-400 hover:text-neutral-300 transition-colors"
      >
        <span className="text-sm uppercase tracking-wide font-medium">Sources</span>
        <span className="text-sm">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="px-6 pb-4 flex flex-wrap gap-x-6 gap-y-2">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-amber-400 text-sm transition-colors"
            >
              {item.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  )
}