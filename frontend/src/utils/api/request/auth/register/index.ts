import type { FetchesRequestConfig } from '@siberiacancode/fetches';
import type { BaseResponse, RegisterRequest } from '@/generated';
import { apiSadrik } from '@/utils/api/instance';

export type PostRegisterParams = RegisterRequest;

export type PostRegisterRequestConfig =
  FetchesRequestConfig<PostRegisterParams>;

export const register = ({ config, params }: PostRegisterRequestConfig) =>
  apiSadrik.post<BaseResponse>('signup', params, config);
