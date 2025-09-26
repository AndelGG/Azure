from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from db.db import Base


class UserMovie(Base):
    __tablename__ = "user_movies"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    movie_id = Column(String(50), nullable=False)  # ID фильма из внешнего API

    # Статусы просмотра
    is_watched = Column(Boolean, default=False)
    is_liked = Column(Boolean, default=None)  # None - не оценен, True - понравился, False - не понравился
    is_favorite = Column(Boolean, default=False)
    is_in_watchlist = Column(Boolean, default=False)

    # Прогресс просмотра
    current_episode = Column(Integer, default=0)
    total_episodes = Column(Integer, default=None)

    # Рейтинг пользователя (1-10)
    user_rating = Column(Integer, default=None)

    # Заметки пользователя
    notes = Column(Text, default=None)

    # Даты
    added_at = Column(DateTime, default=datetime.utcnow)
    watched_at = Column(DateTime, default=None)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Связь с пользователем
    user = relationship("User", back_populates="movies")

    def __repr__(self):
        return f"<UserMovie(user_id={self.user_id}, movie_id={self.movie_id}, is_watched={self.is_watched})>"
