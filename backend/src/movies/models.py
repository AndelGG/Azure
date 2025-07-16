from sqlalchemy.orm import Mapped, mapped_column

from src.movies.schemas import MovieSchema
from src.db import Base


class Movies(Base):
    __tablename__ = 'movies'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str]

    def to_read_model(self) -> MovieSchema:
        return MovieSchema(
            id=self.id,
            title=self.title
        )
