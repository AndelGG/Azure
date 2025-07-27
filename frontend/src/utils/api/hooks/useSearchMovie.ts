import type { SearchMovieRequestConfig } from '../request/movie';
import { useMutation } from '@tanstack/react-query';
import { searchMovie } from '../request/movie';

export const useSearchMovie = (
  settings?: MutationSettings<SearchMovieRequestConfig, typeof searchMovie>,
) =>
  useMutation({
    mutationKey: ['searchMovie'],
    mutationFn: ({ params, config }) =>
      searchMovie({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  });
