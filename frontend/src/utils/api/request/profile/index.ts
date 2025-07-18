import type { FetchesRequestConfig } from '@siberiacancode/fetches';
import type { BaseResponse, ProfileUserParams } from '@/generated';
import { apiSadrik } from '../../instance';

export type GetProfileParams = ProfileUserParams;

export type GetProfileRequestConfig = FetchesRequestConfig<GetProfileParams>;

export const profile = ({ config, params }: GetProfileRequestConfig) => {
  apiSadrik.get<BaseResponse>(`/profile/${params.username}`, {
    ...config,
    params: { ...params, ...config?.params },
  });
};
