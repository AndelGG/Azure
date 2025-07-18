import type { GetMovieParams } from '../request';
import { useQuery } from '@tanstack/react-query';
import { moviepage } from '../request';

export const useGetMoviePage = (
  params: GetMovieParams,
  settings: QuerySettings<typeof moviepage>,
) =>
  useQuery({
    queryKey: ['getMoviePage', params.id],
    queryFn: () => moviepage({ params, config: settings?.config }),
    ...settings?.options,
  });
