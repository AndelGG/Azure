'use client';

import type { Dispatch, SetStateAction } from 'react';
import type {
  BookmarkResponse,
  EpisodeResponse,
  MovieResponse,
  TranslationResponse,
} from '@/generated';

import { createContext, use, useState } from 'react';

interface Option {
  label: string;
  value: string;
}

type ExtendedEpisode = EpisodeResponse & {
  translations: TranslationResponse[];
  movie: MovieResponse;
};

export interface TranslationSelectorContext {
  bookmark: BookmarkResponse | null;
  episode: ExtendedEpisode;
  episodes: EpisodeResponse[];
  isEpisodeWithoutDuration: boolean;
  setTranslation: Dispatch<SetStateAction<TranslationResponse>>;
  translation: TranslationResponse;
  translationOptions: Option[];
  getNextEpisode: () => EpisodeResponse | null;
}

interface TranslationSelectorProviderProps {
  bookmark: BookmarkResponse | null;
  children: React.ReactNode;
  episode: ExtendedEpisode;
  episodes: EpisodeResponse[];
  initialPlayer: string | null;
  initialTranslator: string | null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TranslationSelectorContextImpl =
  createContext<TranslationSelectorContext>({
    episode: {} as ExtendedEpisode,
    translation: {} as TranslationResponse,
    setTranslation: {} as Dispatch<SetStateAction<TranslationResponse>>,
    getNextEpisode: () => null,
    translationOptions: [],
    bookmark: null,
    isEpisodeWithoutDuration: true,
    episodes: [],
  });

export function TranslationSelectorContextProvider({
  children,
  episode,
  episodes,
  bookmark,
  initialTranslator,
  initialPlayer,
}: TranslationSelectorProviderProps) {
  const translationToOption = (translation: TranslationResponse) => ({
    value: translation.id,
    label: translation.translator.title,
  });
  const getTranslationOptions = () =>
    episode.translations.map((translation) => translationToOption(translation));

  const findTranslationById = (id: string | null) =>
    episode.translations.find((t) => t.id === id);

  const translationOptions = getTranslationOptions();
  const [translation, setTranslation] = useState<TranslationResponse>(
    initialTranslator
      ? (episode.translations.find(
          (t) =>
            t.translator.id === initialTranslator &&
            t.player === (initialPlayer ?? 'KODIK'),
        ) ?? episode.translations[0])
      : // eslint-disable-next-line react-hooks-extra/prefer-use-state-lazy-initialization
        (findTranslationById(bookmark?.translationId ?? null) ??
          episode.translations[0]),
  );

  const getCurrentEpisode = () => episodes.find((e) => e.id === episode.id)!;

  const getNextEpisode = (): EpisodeResponse | null =>
    episodes[episodes.indexOf(getCurrentEpisode()) + 1];

  return (
    <TranslationSelectorContextImpl
      value={{
        episode,
        episodes,
        getNextEpisode,
        translation,
        setTranslation,
        translationOptions,
        bookmark,
        isEpisodeWithoutDuration: episode.duration === null,
      }}
    >
      {children}
    </TranslationSelectorContextImpl>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTranslationSelector = () => use(TranslationSelectorContextImpl);
