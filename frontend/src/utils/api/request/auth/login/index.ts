import type { FetchesRequestConfig } from '@siberiacancode/fetches';
import type { BaseResponse, LoginRequest } from '@/generated';
import { apiSadrik } from '@/utils/api/instance';

export type PostLoginParams = LoginRequest;

export type PostLoginRequestConfig = FetchesRequestConfig<PostLoginParams>;

export const login = ({ config, params }: PostLoginRequestConfig) =>
  apiSadrik.post<BaseResponse>('signin', params, config);
