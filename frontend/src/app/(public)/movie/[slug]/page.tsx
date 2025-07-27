import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMovie } from '@/utils/api/request';
import { Movie } from './Movie';

export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const movie = await getMovie({ params: { slug } }).catch(() => notFound());

  return {
    title: movie.data.title,
    description: movie.data.description,
  };
}

export default function MoviePage() {
  return <Movie />;
}
