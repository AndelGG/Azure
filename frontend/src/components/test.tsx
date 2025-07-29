// 'use client';

// import type {
//   EpisodeResponse,
//   MovieResponse,
//   TranslationResponse,
// } from '@/generated';
// import { useGetAnimeBookmark } from '@/utils/api/hooks/useGetAnimeBookmark';

// import { EpisodeContainer } from './episode/episode-container';
// import { EpisodeInformation } from './episode/episode-information';
// import { NextEpisodesSidebar } from './episode/next-episode-sidebar';
// import { Player } from './episode/player';
// import { TranslationSelectorContextProvider } from '@/app/(contexts)';

// type ExtendedEpisode = EpisodeResponse & {
//   translations: TranslationResponse[];
//   movie: MovieResponse;
// };

// interface TestEpisodeProps {
//   episode: ExtendedEpisode;
//   episodes: EpisodeResponse[];
//   initialPlayer: string | null;
//   initialTranslator: string | null;
// }

// export default function TestEpisode({
//   episode,
//   episodes,
//   initialTranslator,
// }: TestEpisodeProps) {
//   const animeBookmark = useGetAnimeBookmark({ animeUuid: episode.animeId });
//   const bookmark = animeBookmark.data?.data ?? null;

//   return (
//     <TranslationSelectorContextProvider
//       initialPlayer={null}
//       bookmark={bookmark}
//       episode={episode}
//       episodes={episodes}
//       initialTranslator={initialTranslator}
//     >
//       <EpisodeContainer>
//         <Player />
//         <NextEpisodesSidebar episodes={episodes} />
//         <EpisodeInformation />
//       </EpisodeContainer>
//     </TranslationSelectorContextProvider>
//   );
// }
