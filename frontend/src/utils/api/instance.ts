import fetches from '@siberiacancode/fetches';

export const apiAndel = fetches.create({
  baseURL: 'http://25.32.2.191:8000/',
});

export const apiSadrik = fetches.create({
  baseURL: 'http://26.172.117.24:8000/',
});
