import { getSwiper } from '@/utils/api/request';
import { SwiperList } from './swiper-list';

export async function SwiperMediaList() {
  const data = await getSwiper({});

  return <SwiperList data={data.data} />;
}
