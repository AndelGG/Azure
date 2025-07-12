import { Suspense } from 'react';
import { SwiperListSkeleton, SwiperMediaList } from '@/components/swiper';

export const revalidate = 600;

export default function RootPage() {
  return (
    <div className="space-y-2">
      <Suspense fallback={<SwiperListSkeleton length={15} />}>
        <SwiperMediaList />
      </Suspense>
    </div>
  );
}
