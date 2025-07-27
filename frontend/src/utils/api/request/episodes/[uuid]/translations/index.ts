import type { FetchesRequestConfig } from '@siberiacancode/fetches';
import type { TranslationResponse } from '@/generated';
import { apiAndel } from '@/utils/api/instance';

export interface GetEpisodeTranslations {
  uuid: string;
}

export type GetEpisodeTranslationsRequestConfig =
  FetchesRequestConfig<GetEpisodeTranslations>;

export const getEpisodeTranslations = ({
  config,
  params,
}: GetEpisodeTranslationsRequestConfig) =>
  apiAndel.get<TranslationResponse[]>(
    `/episodes/${params.uuid}/translations`,
    config,
  );
