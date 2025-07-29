import { MovieMediaList } from '@/components/swiper';

export const revalidate = 600;

export default function RootPage() {
  return (
    <div className="space-y-2">
      <MovieMediaList />
    </div>
  );
}
