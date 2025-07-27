import type { FetchesRequestConfig } from '@siberiacancode/fetches';
import type { MovieResponse } from '@/generated';
import { apiAndel } from '../../../instance';

export interface GetMovieParams {
  slug: string;
}

export type GetMovieRequestConfig = FetchesRequestConfig<GetMovieParams>;

export const getMovie = ({ config, params }: GetMovieRequestConfig) =>
  apiAndel.get<MovieResponse>(`/movies/${params.slug}`, {
    ...config,
    params: { ...params, ...config?.params },
  });
