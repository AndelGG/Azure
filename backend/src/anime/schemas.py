import datetime

from pydantic import BaseModel

from src.tags.schemas import TagsScheme


class AnimeSchema(BaseModel):
    id: int
    slug: str
    age_rating: int
    title: str
    description: str | None
    poster: str
    tags: list[TagsScheme] | None
    created_at: str | None
    updated_at: str | None
    seasons: list[str] | None
    anime_status: str | None
    shikimori_rating: float | None

