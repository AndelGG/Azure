import fetches from '@siberiacancode/fetches';
import { AndelUrl, SadrikUrl } from '@/app/(constants)';

export const apiAndel = fetches.create({
  baseURL: AndelUrl,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

export const apiSadrik = fetches.create({
  baseURL: SadrikUrl,
});
