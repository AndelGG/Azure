import { notFound } from 'next/navigation';

import TestEpisode from '@/components/test';
import { getAnimeEpisodes } from '@/utils/api/requests/anime/[uuid]/episodes';
import { getEpisode } from '@/utils/api/requests/episodes/[uuid]';
import { getEpisodeTranslations } from '@/utils/api/requests/episodes/[uuid]/translations';

export const revalidate = 300;

export default async function EpisodePage({
  params,
  searchParams,
}: {
  params: Promise<{ uuid: string }>;
  searchParams: Promise<{ translator: string }>;
}) {
  const uuid = (await params).uuid;
  const episode = await getEpisode({ params: { uuid } }).catch(() =>
    notFound(),
  );

  const episodes = await getAnimeEpisodes({
    params: { uuid: episode.data.animeId },
  });
  const translations = await getEpisodeTranslations({ params: { uuid } });

  const episodeWithTranslations = {
    ...episode.data,
    translations: translations.data,
  };

  const translator = (await searchParams).translator ?? null;

  return (
    <TestEpisode
      initialPlayer={null}
      episode={episodeWithTranslations}
      episodes={episodes.data}
      initialTranslator={translator}
    />
  );
}
