from pydantic import BaseModel

from src.tags.schemas import TagsScheme


class TranslationSchema(BaseModel):
    id: int
    title: str
    type: str


class MovieSchema(BaseModel):
    id: str
    slug: str
    age_rating: int | None
    title: str
    description: str | None
    poster: str | None
    tags: list[TagsScheme] | None
    blocked_countries: list[str] | None
    year: int | None
    duration: int | None
    episodes_count: int | None
    kinopoisk_rating: float | None
    created_at: str | None
    updated_at: str | None
    screenshots: list[str] | None
    seasons: list[str] | None
    countries: list[str] | None
    iframe_url: str | None = None
    type: str | None
    anime_status: str | None = None
    anime_studios: list[str] | None = None
    translations: list[TranslationSchema] | None = None

# TODO: anime schema

class SearchSchema(BaseModel):
    id: str
    slug: str
    poster: str | None
    title: str

class PopularSchema(SearchSchema):
    translations: list[TranslationSchema] | None = None

class SearchShortSchema(SearchSchema):
    type: str | None

class TranslationSchema(BaseModel):
    id: int | None = None
    title: str | None = None
    type: str | None = None