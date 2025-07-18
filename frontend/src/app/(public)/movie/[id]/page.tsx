import type { Metadata } from 'next';
import notFound from '@/app/not-found';
import { moviepage } from '@/utils/api/request';
import { Movie } from './Movie';

export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const movie = await moviepage({ params: { id } }).catch(() => notFound());

  return {
    title: movie.data.title,
    description: movie.data.description,
  };
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const movie = await moviepage({ params: { id } });
  return <Movie movie={movie.data} />;
}
