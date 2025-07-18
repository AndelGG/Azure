'use client';

import type { SwiperMoviesResponse } from '@/generated';
import ScrollContainer from 'react-indiana-drag-scroll';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui';
import { Card, CardContent } from '../ui/card';
import { SwiperCard, SwiperCardSkeleton } from './swiper-card';
import 'swiper/css';

export function SwiperList({ data }: { data: SwiperMoviesResponse[] }) {
  if (!data) {
    return <span>No data...</span>;
  }

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
            {data.map((film, index) => (
              <div
                key={film.id}
                className={cn(
                  '!w-auto',
                  index !== 0 ? 'ml-5' : '',
                  'flex-shrink-0',
                )}
              >
                <SwiperCard
                  id={film.id}
                  title={film.title}
                  poster={film.poster}
                />
              </div>
            ))}
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
}

interface SwiperListSkeletonProps {
  length?: number;
}

export function SwiperListSkeleton({ length = 15 }: SwiperListSkeletonProps) {
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
                <SwiperCardSkeleton />
              </div>
            ))}
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
}
