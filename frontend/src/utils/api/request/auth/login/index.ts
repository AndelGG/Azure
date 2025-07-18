import type { FetchesRequestConfig } from '@siberiacancode/fetches';
import type { LoginRequest, UserResponse } from '@/generated';
import { apiSadrik } from '@/utils/api/instance';

export type PostLoginParams = LoginRequest;

export type PostLoginRequestConfig = FetchesRequestConfig<PostLoginParams>;

export const login = ({ config, params }: PostLoginRequestConfig) =>
  apiSadrik.post<UserResponse>('/signin', params, config);
