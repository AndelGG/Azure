import type { MovieResponse } from '@/generated';
import { typeMapping } from '@/app/(constants)';
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
    'age_rating' | 'countries' | 'duration' | 'seasons' | 'year'
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
      <DetailsItem label="Год выхода" value={movie.year} />
      <DetailsItem
        label="Тип"
        value={movie.seasons ? typeMapping.SERIES : typeMapping.MOVIE}
      />
      <DetailsItem label="Страна" value={movie.countries} />
      {movie.seasons && (
        <DetailsItem label="Сезонов" value={[movie.seasons].length} />
      )}
      {!movie.seasons && (
        <DetailsItem
          label="Продолжительность эпизода"
          value={`${movie.duration} мин.`}
        />
      )}
    </>
  );
}
