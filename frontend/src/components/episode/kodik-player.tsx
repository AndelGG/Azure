'use client';

import { useEffect, useState } from 'react';

import { useTranslationSelector } from '@/app/(contexts)';
import { cn } from '@/lib/utils';
import { useCreateBookmark } from '@/utils/api/hooks/useCreateBookmark';
import { usePatchEpisodeDuration } from '@/utils/api/hooks/usePatchEpisodeDuration';

interface Props {
  className?: string;
}

export function KodikPlayer({ className }: Props) {
  const { episode, getNextEpisode, translation, isEpisodeWithoutDuration } =
    useTranslationSelector();

  const createBookmark = useCreateBookmark();
  const patchEpisodeDuration = usePatchEpisodeDuration();

  let bookmarkSubmitted = false;

  useEffect(() => {
    const kodikMessageListener = (message: any) => {
      switch (message.data.key) {
        case 'kodik_player_duration_update': {
          if (isEpisodeWithoutDuration)
            patchEpisodeDuration.mutateAsync({
              params: {
                uuid: episode.id,
                duration: Number.parseInt(message.data.value),
              },
            });
          break;
        }
        case 'kodik_player_time_update': {
          if (bookmarkSubmitted) return;

          bookmarkSubmitted = true;
          // eslint-disable-next-line react-web-api/no-leaked-timeout
          setTimeout(() => {
            createBookmark.mutateAsync({
              params: {
                episodeId: episode.id,
                translationId: translation.id,
                timing: message.data.value,
              },
            });
            bookmarkSubmitted = false;
          }, 5000);
          break;
        }
        case 'kodik_player_video_ended': {
          const nextEpisode = getNextEpisode();

          if (nextEpisode) {
            window.location.href = `/episode/${nextEpisode.id}?translator=${translation.translatorId}`;
          }

          break;
        }
      }
    };

    window.addEventListener('message', kodikMessageListener);
    return () => window.removeEventListener('message', kodikMessageListener);
  }, [episode, translation, getNextEpisode]);

  const getIframe = (): string | null => {
    const url = translation.url!.iframe;

    if (!url) return null;

    return String(url);
  };

  const [iframe, setIframe] = useState(() => getIframe());

  const [isInitial, setInitial] = useState(true);
  useEffect(() => {
    if (isInitial) {
      const iframe = getIframe();
      if (!iframe) return;

      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setIframe(`${iframe}`);
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      return setInitial(false);
    }
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setIframe(getIframe());
  }, [translation]);

  if (!iframe) return null;

  return (
    // eslint-disable-next-line react-dom/no-missing-iframe-sandbox
    <iframe
      className={cn('w-full focus:outline-none', className)}
      src={iframe}
      title="Плеер"
      allow="autoplay *; fullscreen *"
      allowFullScreen
      frameBorder="0"
      loading="lazy"
    />
  );
}
