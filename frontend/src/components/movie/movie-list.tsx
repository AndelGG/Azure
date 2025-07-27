'use client';

import ScrollContainer from 'react-indiana-drag-scroll';
import { cn } from '@/lib/utils';
import { MovieCard, MovieCardSkeleton } from './movie-card';
import 'swiper/css';

interface MovieListProps {
  data: { id: number; slug: string; title: string; poster: string }[];
}

export function MovieList({ data }: MovieListProps) {
  if (!data || data.length === 0) {
    return <span>No data...</span>;
  }

  return (
    <div className="w-full">
      <div className="mx-auto mt-5 mr-15 ml-15 overflow-x-hidden">
        <p className="mb-5 text-xl font-semibold">Популярные</p>
        <ScrollContainer
          className="cursor-grab active:cursor-grabbing"
          vertical={false}
          horizontal={true}
          nativeMobileScroll={true}
        >
          <div className="flex flex-nowrap gap-5">
            {data.map((movie, index) => (
              <div
                key={movie.id}
                className={cn(
                  '!w-auto',
                  index !== 0 ? 'ml-5' : '',
                  'flex-shrink-0',
                )}
              >
                <MovieCard
                  slug={movie.slug}
                  title={movie.title}
                  poster={movie.poster}
                />
              </div>
            ))}
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
}

interface MovieListSkeletonProps {
  length?: number;
}

export function MovieListSkeleton({ length = 15 }: MovieListSkeletonProps) {
  return (
    <div className="w-full">
      <div className="mx-auto mt-10 mr-15 ml-15 overflow-x-hidden">
        <ScrollContainer
          className="cursor-grab active:cursor-grabbing"
          vertical={false}
          horizontal={true}
          nativeMobileScroll={true}
        >
          <div className="flex flex-nowrap gap-5">
            {Array.from({ length }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  '!w-auto',
                  index !== 0 ? 'ml-3' : '',
                  'min-w-[150px] flex-shrink-0',
                )}
              >
                <MovieCardSkeleton />
              </div>
            ))}
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
}
