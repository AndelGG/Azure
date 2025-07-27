import type { FetchesRequestConfig } from '@siberiacancode/fetches';
import type { EpisodeResponse, PatchEpisodeRequest } from '@/generated';
import { apiAndel } from '@/utils/api/instance';

export type PatchEpisodeDurationParams = PatchEpisodeRequest & {
  uuid: string;
};

export type PatchEpisodeDurationRequestConfig =
  FetchesRequestConfig<PatchEpisodeDurationParams>;

export const patchEpisodeDuration = ({
  config,
  params,
}: PatchEpisodeDurationRequestConfig) =>
  apiAndel.patch<EpisodeResponse>(`/episodes/${params.uuid}`, params, config);
