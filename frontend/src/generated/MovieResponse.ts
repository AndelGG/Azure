export interface MovieResponse {
  id: number;
  slug: string;
  age_rating: number;
  iframe_url: string | null;

  title?: string | null;
  description?: string | null;
  poster?: string | null;
  banner?: string | null;
  tags?: [{ id: number; genre: string }] | null;
  blocked_countries?: string[] | null;
  year?: number | null;
  duration?: number | null;
  episodes_count?: number | null;
  updatedAt: string | null;
  createdAt: string | null;
  screenshots: string[] | null;
  seasons?: [] | null;
  countries?: string[] | null;
  type?: string | null;

  anime_studios?: string | null;
  anime_status?: string | null;

  kinopoisk_rating?: number | null;
  shikimori_rating?: number | null;
}
