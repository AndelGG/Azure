'use client';

import { useKeenSlider } from 'keen-slider/react';
import { FilmCard } from '@/components/film/film-card';
import 'keen-slider/keen-slider.min.css';

export default function RootPage() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 0,
    },
  });
  return (
    <div ref={ref} className="keen-slider">
      <div className="keen-slider__slide">
        <FilmCard />
      </div>
      <div className="keen-slider__slide">
        <FilmCard />
      </div>
      <div className="keen-slider__slide">
        <FilmCard />
      </div>
      <div className="keen-slider__slide">
        <FilmCard />
      </div>
    </div>
  );
}
