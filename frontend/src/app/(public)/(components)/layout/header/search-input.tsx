'use client';

import type { MovieResponse } from '@/generated/MovieResponse';
import { useDebounceValue, useField } from '@siberiacancode/reactuse';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { AspectRatio, Skeleton, Typography } from '@/components/ui';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { useSearchMovie } from '@/utils/api/hooks';

interface SearchItemProps {
  className?: string;
  movie: Pick<
    MovieResponse,
    'id' | 'poster' | 'seasons_count' | 'slug' | 'year'
  >;
}

function SearchItem({ movie, className }: SearchItemProps) {
  return (
    <Link
      href={`/movie/${movie.slug}`}
      prefetch
      className={cn(
        'hover:bg-accent flex cursor-pointer items-center gap-2 px-4 py-2 text-sm transition-colors duration-150 ease-out',
        className,
      )}
    >
      <div className="bg-muted w-14 max-w-[56px] min-w-[56px] overflow-hidden rounded border">
        <AspectRatio ratio={2 / 3}>
          <Image
            fill
            alt={movie.slug}
            className="relative size-full object-cover object-center"
            sizes="56px"
            src={movie.poster!}
          />
        </AspectRatio>
      </div>
      <div className="flex flex-col justify-between self-stretch py-1.5">
        <div>
          <p className="line-clamp-2">{`${movie.slug} ${movie.year}`}</p>
        </div>
        <div className="text-muted-foreground text-xs">
          <span>{`${movie.seasons_count} Сезонов`}</span>
        </div>
      </div>
    </Link>
  );
}

export function SearchInput() {
  const searchQuery = useField();
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<MovieResponse[]>([]);

  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounceValue(searchQuery.getValue(), 300);

  const { mutateAsync, isPending } = useSearchMovie();

  const handleSearch = useCallback(async () => {
    try {
      const response = await mutateAsync({
        params: {
          query: searchQuery.getValue(),
        },
      });
      setResults([response.data]);
    } catch (error) {
      toast.error(`Произошла ошибка, попробуйте позже. ${error}`);
      setResults([]);
    }
  }, [searchQuery.getValue(), mutateAsync]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      )
        setOpen(false);
    };

    if (open) document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <Command className="w-150 border">
        <CommandInput
          onFocus={() => setOpen(true)}
          placeholder="Поиск..."
          {...searchQuery.register()}
        />
        {open && (
          <div className="bg-muted absolute top-full left-0 mt-2 flex w-full flex-col rounded-md border shadow-lg">
            <div className="ml-auto flex cursor-pointer pt-2 pr-2">
              <X size={20} onClick={() => setOpen(false)} />
            </div>

            <CommandEmpty>
              <Typography muted>По вашему запросу ничего не найдено</Typography>
            </CommandEmpty>

            <CommandList>
              {isPending
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className="flex items-center gap-2 px-4 py-2"
                    >
                      <Skeleton className="h-[84px] w-14" />
                      <div className="flex grow flex-col gap-3 self-stretch">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))
                : results.length !== 0 && (
                    <div className="max-h-[80vh] overflow-y-auto">
                      {results.map((movie) => (
                        <CommandItem key={movie.id}>
                          <SearchItem movie={movie} />
                        </CommandItem>
                      ))}
                    </div>
                  )}
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}
