'use client';

import { useAsync } from '@siberiacancode/reactuse';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Frame } from '@/components/movie';
import { Description } from '@/components/movie/description';
import { Details } from '@/components/movie/details';
import { KodikPlayer } from '@/components/player/kodik-player';
import {
  AspectRatio,
  badgeVariants,
  Button,
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
import type { MovieResponse } from '@/generated';

export function Movie() {
  const slug = useParams().slug as string;
  const getMovieQuery = useAsync(() => getMovie({ params: { slug } }), []);

  const movie = getMovieQuery.data?.data as MovieResponse | undefined;

  const [selectedSeason, setSelectedSeason] = React.useState<number>(1);
  const [selectedEpisode, setSelectedEpisode] = React.useState<number>(1);

  console.log(movie);

  // Получаем список сезонов и серий (примерная структура, поправь если отличается)
  const seasons = movie?.seasons || [1];
  // Если есть массив сезонов с сериями:
  const episodes = React.useMemo(() => {
    // Если просто массив эпизодов:
    if (movie?.episodes_count) {
      return Array.from({ length: movie.episodes_count }, (_, i) => i + 1);
    }
    // Если ничего нет, по умолчанию 1 серия
    return [1];
  }, [movie]);

  const randomBanner = useMemo(() => {
    if (Array.isArray(movie?.screenshots) && movie.screenshots.length > 0) {
      return movie.screenshots[
        Math.floor(Math.random() * movie.screenshots.length)
      ];
    }
    return movie?.poster || '';
  }, [movie]);

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
              src={randomBanner}
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

                <Button
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'w-full',
                  )}
                >
                  ☆
                </Button>

                <div className="bg-card flex flex-col gap-3 rounded-md border p-3 max-sm:hidden">
                  <Details movie={movie!} />
                </div>
              </div>

              <div className="mt-3 mb-6 flex grow flex-col gap-2.5 max-sm:mt-0">
                <div className="flex flex-col">
                  <Typography h3 as="h1">
                    {movie?.title}
                  </Typography>
                </div>

                <div className="flex flex-wrap gap-2">
                  {movie?.tags?.map((tag) => (
                    <Link href="/" key={tag.id} className={cn(badgeVariants())}>
                      {tag.genre.charAt(0).toUpperCase() + tag.genre.slice(1)}
                    </Link>
                  ))}
                </div>

                <div className="mt-3 flex w-full flex-col gap-3">
                  <Frame screenshots={movie?.screenshots || []} />
                </div>

                <Description value={movie?.description} />

                <div className="mt-4 flex">
                  <div className="flex w-full flex-col">
                    <KodikPlayer
                      className="aspect-video rounded-md"
                      iframeUrl={movie?.iframe_url || ''}
                      episode={selectedEpisode}
                      season={selectedSeason}
                    />
                    <div className="mt-4 mb-4">
                      {seasons.length && (
                        <div className="mb-2 flex gap-2">
                          {seasons.map((season: number) => (
                            <Button
                              key={season}
                              className={cn(
                                buttonVariants({ variant: 'outline' }),
                                'border px-2 py-1 text-white',
                                selectedSeason === season &&
                                  'border-2 border-purple-600',
                              )}
                              onClick={() => {
                                setSelectedSeason(season);
                                setSelectedEpisode(1);
                              }}
                            >
                              {season} сезон
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex w-full flex-col gap-3">
                      <ScrollContainer
                        className="cursor-grab active:cursor-grabbing"
                        vertical={false}
                        horizontal={true}
                        nativeMobileScroll={true}
                      >
                        <div className="flex w-0 flex-nowrap gap-3">
                          {episodes.map((episode: number) => (
                            <Button
                              key={episode}
                              className={cn(
                                buttonVariants({ variant: 'outline' }),
                                'flex-shrink-0 border px-5 py-5 text-white',
                                selectedEpisode === episode && 'border-2',
                              )}
                              onClick={() => setSelectedEpisode(episode)}
                            >
                              {episode}
                            </Button>
                          ))}
                        </div>
                      </ScrollContainer>
                    </div>
                  </div>
                </div>

                {/* <Tabs defaultValue="description">
                  <TabsList className="my-2 gap-4">
                    <TabsTrigger className="cursor-pointer" value="description">
                      Описание
                    </TabsTrigger>

                    <TabsTrigger className="cursor-pointer" value="watching">
                      Смотреть
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="description">
                    <Description value={movie?.description} />
                  </TabsContent>

                  <TabsContent value="watching">
                    <div className="mt-4 flex">
                      <div className="flex flex-col">
                        <KodikPlayer
                          className="aspect-video w-250 rounded-md"
                          iframeUrl={movie?.iframe_url || ''}
                          episode={selectedEpisode}
                          season={selectedSeason}
                        />
                        <div className="mt-4 mb-4">
                          {seasons.length && (
                            <div className="mb-2 flex gap-2">
                              {seasons.map((season: number) => (
                                <Button
                                  key={season}
                                  className={cn(
                                    buttonVariants({ variant: 'outline' }),
                                    'border px-2 py-1 text-white',
                                    selectedSeason === season &&
                                      'border-2 border-purple-600',
                                  )}
                                  onClick={() => {
                                    setSelectedSeason(season);
                                    setSelectedEpisode(1);
                                  }}
                                >
                                  {season} сезон
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex w-full flex-col gap-3">
                          <ScrollContainer
                            className="cursor-grab active:cursor-grabbing"
                            vertical={false}
                            horizontal={true}
                            nativeMobileScroll={true}
                          >
                            <div className="flex w-0 flex-nowrap gap-3">
                              {episodes.map((episode: number) => (
                                <Button
                                  key={episode}
                                  className={cn(
                                    buttonVariants({ variant: 'outline' }),
                                    'flex-shrink-0 border px-5 py-5 text-white',
                                    selectedEpisode === episode && 'border-2',
                                  )}
                                  onClick={() => setSelectedEpisode(episode)}
                                >
                                  {episode}
                                </Button>
                              ))}
                            </div>
                          </ScrollContainer>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// SKELETON
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
