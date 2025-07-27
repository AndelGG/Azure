import type { FetchesRequestConfig } from '@siberiacancode/fetches';
import type { MovieResponse } from '@/generated';
import { apiAndel } from '../../instance';

// export interface GetSwiperParams {
//   counter: number;
// }

// export type GetSwiperRequestConfig = FetchesRequestConfig<GetSwiperParams>;

export const getSwiper = ({ params, config }: RequestConfig) =>
  apiAndel.get<MovieResponse>('/movies/popular', {
    params,
    ...config,
  });
