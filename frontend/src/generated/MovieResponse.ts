export interface MovieResponse {
  id: number;
  slug: string;
  age_rating: number;
  title?: string | null;
  description?: string | null;
  poster?: string | null;
  banner?: string | null;
  tags?: [{ id: number; genre: string }] | null;
  blocked_countries?: string[] | null;
  year?: number | null;
  duration?: number | null;
  episodes_count?: number | null;
  seasons_count?: number | null;
  updatedAt: string | null;
  createdAt: string | null;
  screenshots: string[] | null;
  seasons?: object | null;
  countries?: string[] | null;

  kinopoisk_rating?: number | null;
  shikimori_rating?: number | null;
}
