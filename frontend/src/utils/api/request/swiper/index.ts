import type { SwiperMoviesResponse } from '@/generated';
import { apiAndel } from '../../instance';

export const getSwiper = ({ params, config }: RequestConfig) =>
  apiAndel.get<SwiperMoviesResponse>('/movies/popular', {
    ...config,
    params,
  });
