from pydantic import BaseModel

class Movie(BaseModel):
    id: int
    title: str
    poster: str
    description: str
    release_year: int
    genre: str