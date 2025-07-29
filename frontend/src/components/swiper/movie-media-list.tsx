'use client';

import { useAsync } from '@siberiacancode/reactuse';
import { getSwiper } from '@/utils/api/request';
import { MovieList, MovieListSkeleton } from '.';

export function MovieMediaList() {
  const getSwiperQuery = useAsync(() => getSwiper({}), []);

  return (
    <>
      {getSwiperQuery.isLoading && <MovieListSkeleton />}
      {getSwiperQuery.data && <MovieList data={getSwiperQuery.data.data} />}
    </>
  );
}
