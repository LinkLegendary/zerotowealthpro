
import React from 'react'

interface YouTubeEmbedProps {
  videoId: string
  title?: string
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div className="my-8">
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          🎥 {title}
        </h3>
      )}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || 'YouTube video'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="text-gray-500 text-sm mt-2 text-center">
        Prefer to read? Keep scrolling for the full article.
      </p>
    </div>
  )
}



















