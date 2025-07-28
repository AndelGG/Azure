from pydantic import BaseModel

from src.tags.schemas import TagsScheme


class MovieSchema(BaseModel):
    id: str
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
    kinopoisk_rating: float | None
    createdAt: str | None
    updatedAt: str | None
    screenshots: list[str] | None
    seasons: list[str] | None
    countries: list[str] | None

class SearchSchema(BaseModel):
    id: str
    slug: str
    poster: str | None
    title: str