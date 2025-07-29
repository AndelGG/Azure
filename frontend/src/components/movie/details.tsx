import type { MovieResponse } from '@/generated';
import { statusMapping, typeMapping } from '@/app/(constants)';
import { cn } from '@/lib/utils';

interface DetailsItemProps {
  danger?: boolean;
  label: string;
  value: number | string | null | undefined;
}

function DetailsItem({ label, value, danger }: DetailsItemProps) {
  if (!value) return null;

  return (
    <div className="max-xs:whitespace-nowrap relative flex flex-col">
      <label className="text-muted-foreground text-xs">{label}</label>
      <span
        className={cn(
          'text-sm whitespace-pre-line',
          danger && 'font-semibold text-red-500',
        )}
      >
        {value}
      </span>
    </div>
  );
}

interface DetailsProps {
  movie: Pick<
    MovieResponse,
    | 'age_rating'
    | 'anime_status'
    | 'anime_studios'
    | 'countries'
    | 'duration'
    | 'seasons'
    | 'type'
    | 'year'
  >;
}

export function Details({ movie }: DetailsProps) {
  return (
    <>
      <DetailsItem
        danger
        label="Возрастное ограничение"
        value={`${movie.age_rating}+`}
      />
      <DetailsItem label="Студия" value={movie.anime_studios} />
      <DetailsItem label="Статус" value={statusMapping[movie.anime_status]} />
      <DetailsItem label="Год выпуска" value={movie.year} />
      <DetailsItem label="Тип" value={typeMapping[movie.type]} />
      <DetailsItem label="Страна" value={movie.countries} />
      {!movie.seasons && (
        <DetailsItem
          label="Продолжительность эпизода"
          value={`${movie.duration} мин.`}
        />
      )}
    </>
  );
}
