import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  figureNumber: string;
  caption: string;
  aspectClass?: string;
  className?: string;
  priority?: boolean;
}

export function ResilientImage({
  src,
  alt,
  figureNumber,
  caption,
  aspectClass = 'aspect-[4/3]',
  className = '',
  priority = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`m-0 ${className}`}>
      <div
        className={`relative overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 ${aspectClass}`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center bg-gradient-to-br from-stone-100 via-stone-200/70 to-stone-100 dark:from-stone-900 dark:via-stone-800/60 dark:to-stone-900">
            <BookOpen className="h-7 w-7 text-stone-400 dark:text-stone-500" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wider text-stone-500 dark:text-stone-400">
              {figureNumber}
            </span>
            <p className="max-w-xs text-xs text-stone-600 dark:text-stone-400">{alt}</p>
          </div>
        )}
      </div>
      <figcaption className="mt-2.5 font-serif text-xs italic leading-relaxed text-stone-500 dark:text-stone-400">
        {caption}
      </figcaption>
    </figure>
  );
}
