'use client';

import { useTranslationSelector } from '@/app/(contexts)';
import { KodikPlayer } from './kodik-player';

export function Player() {
  const { translation } = useTranslationSelector();

  if (!translation) return null;

  return translation.player === 'KODIK' ? (
    <KodikPlayer className="aspect-video rounded-md" />
  ) : null;
}
