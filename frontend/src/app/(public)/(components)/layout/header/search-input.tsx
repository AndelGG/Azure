'use client';

import type { KeyboardEvent } from 'react';
import type { MovieResponse } from '@/generated/MovieResponse';
import { useBoolean, useDebounceValue } from '@siberiacancode/reactuse';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { statusMapping, typeMapping } from '@/app/(constants)';
import { AspectRatio, Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import { searchMovie } from '@/utils/api/request/movie';

interface SearchItemProps {
  className?: string;
  movie: Pick<
    MovieResponse,
    'anime_status' | 'id' | 'poster' | 'slug' | 'title' | 'type' | 'year'
  >;
  onNavigate: () => void;
}

function SearchItem({ movie, className, onNavigate }: SearchItemProps) {
  return (
    <>
      <Link
        href={`/movie/${movie.slug.replace(/\s+/g, '_')}`}
        prefetch
        className={cn(
          'flex cursor-pointer items-center gap-2 px-4 py-2 text-sm transition-colors duration-150 ease-out',
          className,
        )}
        onClick={onNavigate}
      >
        <div className="bg-muted w-14 max-w-[56px] min-w-[56px] overflow-hidden rounded border">
          <AspectRatio ratio={2 / 3}>
            <Image
              fill
              alt={movie.slug}
              className="relative size-full object-cover object-center"
              sizes="56px"
              src={movie.poster || ''}
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col self-stretch py-1.5">
          <p className="line-clamp-2">{`${movie.title}`}</p>
          <div className="text-muted-foreground text-xs">
            <span>{typeMapping[movie.type]}</span>
          </div>
          {movie.anime_status && (
            <span className="text-muted-foreground text-xs">
              {statusMapping[movie.anime_status]}
            </span>
          )}
        </div>
      </Link>
      <div className="border-b"></div>
    </>
  );
}

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useBoolean(false);
  const [results, setResults] = useState<MovieResponse[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounceValue(query, 500);

  const router = useRouter();

  const handleSearch = useCallback(async () => {
    try {
      const response = await searchMovie({
        params: {
          search: query,
        },
      });
      setResults(response.data);
    } catch (error) {
      toast.error(`Произошла ошибка, попробуйте позже. ${error}`);
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim() && query.length >= 3) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

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

  const handleNavigate = useCallback(() => {
    setOpen(false);
    setQuery('');
    setResults([]);
  }, [setOpen]);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (query.length > 3) {
        router.push(`/catalog/search?query="${query}"`);
        handleNavigate();
      } else {
        toast.error('Меньше 3 слов в запросе');
      }
    }
  };

  return (
    <div ref={containerRef} className="xs:w-100 relative md:w-125 lg:w-175">
      <Search
        className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
        size={20}
      />
      <Input
        className="pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Поиск..."
      />
      {open && (
        <div className="bg-muted absolute mt-2 flex min-h-25 w-full flex-col rounded-xs border-2 shadow-lg">
          <div className="ml-auto flex pt-2 pr-2">
            <X className="cursor-pointer" onClick={() => setOpen(false)} />
          </div>

          {results.length !== 0 ? (
            <div className="max-h-[80vh] overflow-y-auto">
              {results.map((movie) => (
                <SearchItem
                  key={movie.id}
                  movie={movie}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          ) : (
            <p className="text-center">По вашему запросу ничего не найдено</p>
          )}
        </div>
      )}
    </div>
  );
}
