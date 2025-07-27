import type { PatchEpisodeDurationRequestConfig } from '../request';
import { useMutation } from '@tanstack/react-query';
import { patchEpisodeDuration } from '../request';

export const usePatchEpisodeDuration = (
  settings?: MutationSettings<
    PatchEpisodeDurationRequestConfig,
    typeof patchEpisodeDuration
  >,
) =>
  useMutation({
    mutationKey: ['patchEpisodeDuration'],
    mutationFn: ({ params, config }) =>
      patchEpisodeDuration({
        params: {
          ...params,
        },
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });
