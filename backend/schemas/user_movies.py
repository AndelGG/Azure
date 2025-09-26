from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class UserMovieBase(BaseModel):
    movie_id: str
    is_watched: bool = False
    is_liked: Optional[bool] = None
    is_favorite: bool = False
    is_in_watchlist: bool = False
    current_episode: int = 0
    total_episodes: Optional[int] = None
    user_rating: Optional[int] = Field(None, ge=1, le=10)
    notes: Optional[str] = None


class UserMovieCreate(UserMovieBase):
    pass


class UserMovieUpdate(BaseModel):
    is_watched: Optional[bool] = None
    is_liked: Optional[bool] = None
    is_favorite: Optional[bool] = None
    is_in_watchlist: Optional[bool] = None
    current_episode: Optional[int] = None
    total_episodes: Optional[int] = None
    user_rating: Optional[int] = Field(None, ge=1, le=10)
    notes: Optional[str] = None
    watched_at: Optional[datetime] = None


class UserMovieSchema(UserMovieBase):
    id: int
    user_id: int
    added_at: datetime
    watched_at: Optional[datetime] = None
    updated_at: datetime

    class Config:
        from_attributes = True


class UserMovieStatusUpdate(BaseModel):
    """Схема для быстрого обновления статуса фильма"""
    status: str = Field(..., description="Статус: watched, liked, disliked, favorite, watchlist")
    episode: Optional[int] = None
    rating: Optional[int] = Field(None, ge=1, le=10)
