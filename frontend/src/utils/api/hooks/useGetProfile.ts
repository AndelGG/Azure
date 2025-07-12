import type { GetProfileParams } from '../request';
import { useQuery } from '@tanstack/react-query';
import { profile } from '../request';

export const useGetProfile = (
  params: GetProfileParams,
  settings: QuerySettings<typeof profile>,
) =>
  useQuery({
    queryKey: ['getProfile', params.id],
    queryFn: () => profile({ params, config: settings?.config }),
    ...settings?.options,
  });
