import Image from 'next/image';
import Link from 'next/link';
import {
  AspectRatio,
  badgeVariants,
  Button,
  buttonVariants,
  Tabs,
  TabsList,
  TabsTrigger,
  Typography,
} from '@/components/ui';
import { cn } from '@/lib/utils';

export const revalidate = 600;

// Сделать для фильмов
// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const slug = (await params).slug;
//   const anime = await getAnime({ params: { slug } }).catch(() => notFound());

//   return {
//     title: anime.data.russianTitle ?? anime.data.romajiTitle,
//     description: anime.data.description,
//     openGraph: {
//       images: [anime.data.poster ?? ''],
//       title: anime.data.russianTitle ?? anime.data.romajiTitle ?? '',
//       type: 'website',
//     },
//     twitter: {
//       images: [anime.data.poster ?? ''],
//       title: anime.data.russianTitle ?? anime.data.romajiTitle ?? '',
//     },
//     alternates: {
//       canonical: `/anime/${slug}`,
//     },
//   };
// }

export default function FilmPage() {
  return (
    <>
      <div className="bg-muted relative h-72 overflow-hidden">
        <Image
          fill
          alt={'banner'}
          className={cn('size-full object-cover object-center', 'blur-md')}
          src={'/testbanner.jpg'}
        />
      </div>
      <div className="container">
        <div className="flex gap-6 pb-4 max-sm:flex-col">
          <div className="m-5 flex w-full max-w-[210px] min-w-[210px] flex-col gap-3 max-sm:max-w-[unset] max-sm:min-w-[unset] max-sm:items-center">
            <div className="bg-muted relative mt-[-140px] overflow-hidden rounded-md max-sm:mt-[-220px] max-sm:flex max-sm:w-[210px] max-sm:items-center max-sm:justify-center">
              <AspectRatio ratio={2 / 3}>
                <Image
                  fill
                  alt={'poster'}
                  className="size-full object-cover object-center select-none"
                  sizes="600px"
                  src={'/testposter.jpg'}
                />
              </AspectRatio>
            </div>
            <Link
              href={`/`}
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'mt-2 w-full',
              )}
            >
              Начать просмотр
            </Link>

            <Button className={cn(buttonVariants({ variant: 'secondary' }))}>
              Подробнее
            </Button>
          </div>

          <div className="mt-3 mb-6 flex grow flex-col gap-2.5 max-sm:mt-0">
            <div className="flex flex-col">
              <Typography h3 as="h1">
                Человек-паук возвращение домой
              </Typography>
              <Typography muted>MARVEL STUDIOS</Typography>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link href="/" className={cn(badgeVariants())}>
                Экшен
              </Link>
              <Link href="/" className={cn(badgeVariants())}>
                Боевик
              </Link>
              <Link href="/" className={cn(badgeVariants())}>
                Шутер
              </Link>
            </div>

            <Tabs defaultValue="episodes">
              <TabsList className="my-2">
                <TabsTrigger className="cursor-pointer" value="episodes">
                  Описание
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="comments">
                  Комментарии
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="reviews">
                  Отзывы
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
