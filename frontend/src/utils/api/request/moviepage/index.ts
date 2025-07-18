import type { FetchesRequestConfig } from '@siberiacancode/fetches';
import type { MovieResponse } from '@/generated';
import { apiAndel } from '../../instance';

export interface GetMovieParams {
  id: number;
}

export type GetMovieRequestConfig = FetchesRequestConfig<GetMovieParams>;

export const moviepage = ({ config, params }: GetMovieRequestConfig) => {
  return apiAndel.get<MovieResponse>(`/movies/${params.id}`, {
    ...config,
    params: { ...params, ...config?.params },
  });
};
