from pydantic import BaseModel

from src.tags.schemas import TagsScheme


class MovieSchema(BaseModel):
    id: int
    slug: str
    age_rating: int
    title: str
    description: str | None
    poster: str | None
    tags: list[TagsScheme] | None
    blocked_countries: list[str] | None
    year: int | None
    duration: int | None
    episodes_count: int | None
    kinopoisk_rating: int | None
    updatedAt: str | None
    screenshots: list[str] | None
    seasons: list[str] | None
    countries: str | None

class SearchSchema(BaseModel):
    id: int
    slug: str
    poster: str | None

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        fields = {
            'id': 'id',
            'slug': 'slug',
            'poster': 'poster'
        }