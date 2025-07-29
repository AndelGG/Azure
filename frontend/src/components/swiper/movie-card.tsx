import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AspectRatio, Skeleton } from '../ui';

interface MovieCardProps {
  slug: string;
  title?: string | null;
  poster?: string | null;
}

export function MovieCard({ slug, title, poster }: MovieCardProps) {
  return (
    <div className={cn('relative flex w-36 max-w-full flex-col gap-1')}>
      <Link href={`/movie/${slug.replace(/\s+/g, '_')}`} prefetch>
        <div className="bg-muted w-full overflow-hidden rounded-md select-none">
          <AspectRatio ratio={2 / 3}>
            {poster && (
              <Image
                fill
                alt={slug ?? 'Poster'}
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
          href={`/movie/${slug}`}
          prefetch
          className="line-clamp-2 w-full text-sm text-pretty text-ellipsis"
        >
          {title}
        </Link>
      )}
    </div>
  );
}

export interface MovieCardSkeletonProps {
  className?: string;
}

export function MovieCardSkeleton({ className }: MovieCardSkeletonProps) {
  return (
    <div
      className={cn('relative flex w-36 max-w-full flex-col gap-1', className)}
    >
      <div className="overflow-hidden rounded-md">
        <AspectRatio ratio={2 / 3}>
          <Skeleton className="size-full h-50 w-50" />
        </AspectRatio>
      </div>

      <Skeleton className="mt-2 h-10 w-full" />
    </div>
  );
}
