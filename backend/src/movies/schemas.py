from pydantic import BaseModel

from src.tags.schemas import TagsScheme


class MovieSchema(BaseModel):
    id: int
    title: str
    poster: str
    description: str
    release_year: int
    tags: list[TagsScheme]
    author: str
    banner: str