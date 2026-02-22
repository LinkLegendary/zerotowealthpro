'use client'

import { useState } from 'react'

const sizes = [
  { label: 'S', class: 'prose prose-sm' },
  { label: 'M', class: 'prose prose-base' },
  { label: 'L', class: 'prose prose-lg' },
  { label: 'XL', class: 'prose prose-xl' },
]

export default function FontControls({ content }: { content: string }) {
  const [sizeIndex, setSizeIndex] = useState(2) // default L

  return (
    <div>
      {/* Size Buttons */}
      <div className="flex items-center gap-2 mb-6 justify-end">
        <span className="text-sm text-gray-500 mr-2">Text Size:</span>
        {sizes.map((size, index) => (
          <button
            key={size.label}
            onClick={() => setSizeIndex(index)}
            className={`w-8 h-8 rounded-full text-sm font-bold border transition-all
              ${sizeIndex === index
                ? 'bg-[#4472C4] text-white border-[#4472C4]'
                : 'bg-white text-gray-600 border-gray-300 hover:border-[#4472C4]'
              }`}
          >
            {size.label}
          </button>
        ))}
      </div>

      {/* Content with dynamic prose size */}
      <div className={`${sizes[sizeIndex].class} max-w-none`}>
        {/* MDX content passed as children */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}