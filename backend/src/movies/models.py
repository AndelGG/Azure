from typing import List

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Column, ForeignKey, Table, String, Text

from src.movies.schemas import MovieSchema
from src.db import Base
from src.tags.models import Tags

association_table = Table(
    "movies_tags",
    Base.metadata,
    Column("movie_id", ForeignKey("movies.id")),
    Column("tag_id", ForeignKey("tags.id")),
)

class Movies(Base):
    __tablename__ = 'movies'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str]
    poster: Mapped[str]
    banner: Mapped[str]
    description: Mapped[str]
    release_year: Mapped[int]
    tags: Mapped[List["Tags"]] = relationship(secondary=association_table, back_populates="movies")
    author: Mapped[str]

    def to_read_model(self) -> MovieSchema:
        return MovieSchema(
            id=self.id,
            title=self.title,
            poster=self.poster,
            description=self.description,
            release_year=self.release_year,
            tags=[tag.to_read_model() for tag in self.tags],
            author=self.author,
            banner=self.banner,
        )
