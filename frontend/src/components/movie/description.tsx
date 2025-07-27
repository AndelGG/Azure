'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

interface DescriptionProps {
  value?: string | null;
  wordLimit?: number;
}

export function Description({ value, wordLimit = 50 }: DescriptionProps) {
  const [clamped, setClamped] = useState(true);

  if (!value || value.trim().length === 0) return null;

  const words = value.trim().split(/\s+/);
  const shouldClamp = words.length > wordLimit;

  return (
    <div className="flex flex-col text-sm">
      <p
        className={cn(
          'text-muted-foreground',
          clamped && shouldClamp ? 'line-clamp-3' : 'line-clamp-none',
        )}
      >
        {value}
      </p>
      {shouldClamp && (
        <span
          className="text-primary hover:text-primary/80 mt-1 w-0 cursor-pointer"
          onClick={() => setClamped((prev) => !prev)}
        >
          {clamped ? 'Подробнее...' : 'Свернуть'}
        </span>
      )}
    </div>
  );
}
