import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AspectRatio, Skeleton } from '../ui';

interface SwiperCardProps {
  poster: string;
  title: string;
}

export function SwiperCard({ poster, title }: SwiperCardProps) {
  return (
    <div className={cn('relative flex w-36 max-w-full flex-col gap-1')}>
      <Link href={'/'} prefetch>
        <div className="bg-muted w-full overflow-hidden rounded-md select-none">
          <AspectRatio ratio={2 / 3}>
            {poster && (
              <Image
                fill
                alt={title ?? 'Poster'}
                className="pointer-events-none relative size-full object-cover object-center select-none"
                sizes="600px"
                src={poster}
                priority
              />
            )}
          </AspectRatio>
        </div>
      </Link>
      {title && (
        <Link
          href={'/'}
          prefetch
          className="line-clamp-2 w-full text-sm text-pretty text-ellipsis"
        >
          {title}
        </Link>
      )}
    </div>
  );
}

export interface SwiperCardSkeletonProps {
  className?: string;
}

export function SwiperCardSkeleton({ className }: SwiperCardSkeletonProps) {
  return (
    <div
      className={cn('relative flex w-36 max-w-full flex-col gap-1', className)}
    >
      <div className="overflow-hidden rounded-md">
        <AspectRatio ratio={2 / 3}>
          <Skeleton className="size-full" />
        </AspectRatio>
      </div>

      <Skeleton className="mt-2 h-10 w-full" />
    </div>
  );
}
