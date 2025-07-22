from typing import List

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String

from src.db import Base
from src.tags.schemas import TagsScheme


class Tags(Base):
    __tablename__ = 'tags'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100))
    movies: Mapped[List["Movies"]] = relationship(secondary="movies_tags", back_populates="tags")

    def to_read_model(self) -> TagsScheme:
        return TagsScheme(
            id=self.id,
            name=self.name,
        )
