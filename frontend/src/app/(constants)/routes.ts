export const ROUTES = {
  ROOT: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: (username: string) => `/profile/${username}`,
  FILM: (title: string) => `/film/${title}`,
};
