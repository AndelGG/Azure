'use client';

import { useAsync } from '@siberiacancode/reactuse';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { AndelUrl } from '@/app/(constants)';
import { EpisodeSelector } from '@/components/episode/episode-selector';
import { Description } from '@/components/movie/description';
import { Details } from '@/components/movie/details';
import {
  AspectRatio,
  badgeVariants,
  buttonVariants,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { getMovie } from '@/utils/api/request';
import { getMovieEpisodes } from '@/utils/api/request/movie';
import ScrollContainer from 'react-indiana-drag-scroll';

export function Movie() {
  const slug = useParams().slug;
  const getMovieQuery = useAsync(() => getMovie({ params: { slug } }), []);
  const getEpisodeQuery = useAsync(
    () =>
      getMovieEpisodes({
        params: { uuid: getMovieQuery.data?.data.id as number },
      }),
    [],
  );

  const movie = getMovieQuery.data?.data;
  const randomBanner =
    movie?.screenshots[Math.floor(Math.random() * movie.screenshots.length)];
  console.log(movie);

  const episodes = getEpisodeQuery.data?.data;

  // console.log(episodes);

  return (
    <>
      {getMovieQuery.isLoading && <MovieSkeleton />}
      {getMovieQuery.error && notFound()}
      {getMovieQuery.data && (
        <>
          <div className="bg-muted max-xs:hidden relative h-72 overflow-hidden">
            <Image
              fill
              alt={`Banner ${movie?.title}`}
              className={cn('size-full object-cover object-center blur-md')}
              src={randomBanner || ''}
              priority
            />
          </div>
          <div className="container ml-20">
            <div className="flex gap-6 pb-4 max-sm:flex-col">
              <div className="m-5 flex w-full max-w-[210px] min-w-[210px] flex-col gap-3 max-sm:max-w-[unset] max-sm:min-w-[unset] max-sm:items-center">
                <div className="bg-muted relative mt-[-140px] overflow-hidden rounded-md max-sm:mt-[-220px] max-sm:flex max-sm:w-[210px] max-sm:items-center max-sm:justify-center">
                  <AspectRatio ratio={2 / 3}>
                    <Image
                      fill
                      alt={`Poster ${movie?.title}`}
                      className="size-full object-cover object-center select-none"
                      sizes="600px"
                      src={movie?.poster || ''}
                      priority
                    />
                  </AspectRatio>
                </div>
                <Link
                  href={`/episode/${episodes}`}
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'w-full',
                  )}
                >
                  Начать просмотр
                </Link>
                <div className="bg-card flex flex-col gap-3 rounded-md border p-3 max-sm:hidden">
                  <Details movie={movie} />
                </div>
              </div>

              <div className="mt-3 mb-6 flex grow flex-col gap-2.5 max-sm:mt-0">
                <div className="flex flex-col">
                  <Typography h3 as="h1">
                    {movie?.title}
                  </Typography>
                </div>

                <div className="flex flex-wrap gap-2">
                  {movie?.tags.map((tag) => (
                    <Link href="/" key={tag.id} className={cn(badgeVariants())}>
                      {tag.genre.charAt(0).toUpperCase() + tag.genre.slice(1)}
                    </Link>
                  ))}
                </div>

                <div className="mt-3 flex w-full flex-col gap-3">
                  <p className="text-xl font-semibold">Кадры</p>
                  <ScrollContainer
                    className="cursor-grab rounded-md border-2 active:cursor-grabbing"
                    vertical={false}
                    horizontal={true}
                    nativeMobileScroll={true}
                  >
                    <div className="flex flex-nowrap gap-10 p-3">
                      {movie?.screenshots?.length &&
                        movie?.screenshots?.map((screnshot, index) => (
                          <Image
                            key={index}
                            alt={`Кадр ${index}`}
                            className="size-full select-none"
                            height={350}
                            src={screnshot || null}
                            width={350}
                            priority
                          />
                        ))}
                    </div>
                  </ScrollContainer>
                </div>

                <Tabs defaultValue="description">
                  <TabsList className="my-2 gap-4">
                    <TabsTrigger className="cursor-pointer" value="description">
                      Описание
                    </TabsTrigger>

                    {!!episodes && (
                      <TabsTrigger value="episodes">Эпизоды</TabsTrigger>
                    )}
                  </TabsList>

                  <TabsContent value="description">
                    <Description value={movie?.description} />
                  </TabsContent>

                  {!!episodes && (
                    <TabsContent className="flex flex-col" value="episodes">
                      <EpisodeSelector episodes={episodes} />
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function MovieSkeleton() {
  return (
    <>
      <div className="bg-muted max-xs:hidden relative h-72 overflow-hidden">
        <Skeleton
          className={cn('size-full object-cover object-center blur-md')}
        />
      </div>
      <div className="container ml-20">
        <div className="flex gap-6 pb-4 max-sm:flex-col">
          <div className="m-5 flex w-full max-w-[210px] min-w-[210px] flex-col gap-3 max-sm:max-w-[unset] max-sm:min-w-[unset] max-sm:items-center">
            <div className="bg-muted relative mt-[-140px] overflow-hidden rounded-md max-sm:mt-[-220px] max-sm:flex max-sm:w-[210px] max-sm:items-center max-sm:justify-center">
              <AspectRatio ratio={2 / 3}>
                <Skeleton className="size-full object-cover object-center select-none" />
              </AspectRatio>
            </div>
            <Link
              href={`/`}
              className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
            >
              Начать просмотр
            </Link>
            <div className="bg-card flex flex-col gap-3 rounded-md border p-3 max-sm:hidden">
              <Details movie={''} />
            </div>
          </div>

          <div className="mt-3 mb-6 flex grow flex-col gap-2.5 max-sm:mt-0">
            <div className="flex flex-col">
              <Typography h3 as="h1">
                <Skeleton />
              </Typography>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link href="/" className={cn(badgeVariants())}>
                <Loader2Icon />
              </Link>
            </div>

            <Tabs defaultValue="description">
              <TabsList className="my-2">
                <TabsTrigger className="cursor-pointer" value="description">
                  <Skeleton className="w-12" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
