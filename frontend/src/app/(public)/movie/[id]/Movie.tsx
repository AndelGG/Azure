import Image from 'next/image';
import Link from 'next/link';
import { AndelUrl } from '@/app/(constants)';
import {
  AspectRatio,
  badgeVariants,
  Button,
  buttonVariants,
  Tabs,
  TabsList,
  TabsTrigger,
  Typography,
} from '@/components/ui';
import { cn } from '@/lib/utils';

export function Movie({ movie }) {
  console.log(movie);
  return (
    <>
      <div className="bg-muted relative h-72 overflow-hidden">
        <Image
          fill
          className={cn(
            'size-full object-cover object-center',
            movie.banner && 'blur-md',
          )}
          alt={`Banner ${movie.title}`}
          src={`${AndelUrl}/movies/banner/${movie.banner}` || ''}
        />
      </div>
      <div className="container">
        <div className="flex gap-6 pb-4 max-sm:flex-col">
          <div className="m-5 flex w-full max-w-[210px] min-w-[210px] flex-col gap-3 max-sm:max-w-[unset] max-sm:min-w-[unset] max-sm:items-center">
            <div className="bg-muted relative mt-[-140px] overflow-hidden rounded-md max-sm:mt-[-220px] max-sm:flex max-sm:w-[210px] max-sm:items-center max-sm:justify-center">
              <AspectRatio ratio={2 / 3}>
                <Image
                  fill
                  alt={`Poster ${movie.title}`}
                  className="size-full object-cover object-center select-none"
                  sizes="600px"
                  src={`${AndelUrl}/movies/posters/${movie.poster}` || ''}
                />
              </AspectRatio>
            </div>
            <Link
              href={`/`}
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'mt-2 w-full',
              )}
            >
              Начать просмотр
            </Link>

            <Button className={cn(buttonVariants({ variant: 'secondary' }))}>
              Подробнее
            </Button>
          </div>

          <div className="mt-3 mb-6 flex grow flex-col gap-2.5 max-sm:mt-0">
            <div className="flex flex-col">
              <Typography h3 as="h1">
                {movie.title} {movie.release_year}
              </Typography>
              <Typography muted>{movie.author}</Typography>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.tags.map((tag) => (
                <Link href="/" key={tag.id} className={cn(badgeVariants())}>
                  {tag.genre}
                </Link>
              ))}
            </div>

            <Tabs defaultValue="episodes">
              <TabsList className="my-2">
                <TabsTrigger className="cursor-pointer" value="episodes">
                  Описание
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="comments">
                  Комментарии
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="reviews">
                  Отзывы
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
