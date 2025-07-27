import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { EpisodeResponse } from '@/generated';
import { apiAndel } from '@/utils/api/instance';

export interface GetMovieEpisodesParams {
  uuid: number;
}

export type GetMovieEpisodesRequestConfig =
  FetchesRequestConfig<GetMovieEpisodesParams>;

export const getMovieEpisodes = ({
  config,
  params,
}: GetMovieEpisodesRequestConfig) =>
  apiAndel.get<EpisodeResponse[]>(`/movie/${params.uuid}/episodes`, config);
