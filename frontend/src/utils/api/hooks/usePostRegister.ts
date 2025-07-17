import type { PostRegisterRequestConfig } from '../request/auth/register';
import { useMutation } from '@tanstack/react-query';
import { register } from '../request/auth/register';

export const useRegister = (
  settings?: MutationSettings<PostRegisterRequestConfig>,
) =>
  useMutation({
    mutationKey: ['postRegister'],
    mutationFn: ({ params, config }) =>
      register({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  });
