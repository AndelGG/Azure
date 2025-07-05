import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AspectRatio } from '../ui';

export function FilmCard() {
  return (
    <div className={cn('flex w-45 max-w-full flex-col')}>
      <Link href={'/'} prefetch>
        <div className="bg-muted w-full overflow-hidden rounded-md select-none">
          <AspectRatio ratio={2 / 3}>
            <Image
              fill
              alt={'Poster'}
              className="pointer-events-none relative size-full object-cover object-center select-none"
              sizes={'600'}
              src={'/testmovie.jpg'}
              priority
            />
          </AspectRatio>
        </div>
      </Link>
    </div>
  );
}
