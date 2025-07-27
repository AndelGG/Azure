'use client';

import type { EpisodeResponse } from '@/generated';
import { ArrowUpDownIcon, EyeOffIcon, HeartIcon } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

interface EpisodeSelectorItemProps {
  episode: EpisodeResponse;
}

function EpisodeSelectorItem({ episode }: EpisodeSelectorItemProps) {
  return (
    <div className="bg-accent/50 flex items-center justify-between gap-2 rounded-md p-1.5 text-sm transition-colors">
      <div className="flex max-w-full grow items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => toast.warning('This feature disabled by admin')}
        >
          <EyeOffIcon className="size-4" />
        </Button>
        <Link
          href={`/episode/${episode.id}`}
          prefetch
          className="line-clamp-1 w-full py-2 text-sm font-medium"
        >
          Эпизод {episode.number}
        </Link>
      </div>
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => toast.warning('This feature disabled by admin')}
        >
          <HeartIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}

interface EpisodeSelectorProps {
  episodes: EpisodeResponse[];
}

export function EpisodeSelector({ episodes }: EpisodeSelectorProps) {
  const [ascending, setAscending] = useState(true);

  const sortedEpisodes = useMemo(() => {
    return [...episodes].sort((a, b) =>
      ascending ? a.number - b.number : b.number - a.number,
    );
  }, [episodes, ascending]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <Typography small>Список эпизодов</Typography>
        <Button
          variant="secondary"
          onClick={() => setAscending((prev) => !prev)}
        >
          <ArrowUpDownIcon className="size-4" />
          {ascending ? 'Показать с конца' : 'Показать с начала'}
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {sortedEpisodes.map((episode) => (
          <EpisodeSelectorItem key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
}
