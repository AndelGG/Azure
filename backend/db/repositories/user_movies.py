from abc import ABC, abstractmethod
from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import insert

from models.user_movies import UserMovie
from schemas.user_movies import UserMovieCreate, UserMovieUpdate

class AbstractUserMovieRepository(ABC):
    @abstractmethod
    async def add_user_movie(self, user_id: int, movie_data: UserMovieCreate) -> UserMovie:
        pass

    @abstractmethod
    async def get_user_movie(self, user_id: int, movie_id: str) -> Optional[UserMovie]:
        pass

    @abstractmethod
    async def get_user_movies(self, user_id: int, status_filter: Optional[str] = None) -> List[UserMovie]:
        pass

    @abstractmethod
    async def update_user_movie(self, user_id: int, movie_id: str, update_data: UserMovieUpdate) -> Optional[UserMovie]:
        pass

    @abstractmethod
    async def delete_user_movie(self, user_id: int, movie_id: str) -> bool:
        pass

    @abstractmethod
    async def get_user_movie_stats(self, user_id: int) -> dict:
        pass

class UserMovieRepository(AbstractRepository):
    def __init__(self, session: Session):
        self.session = session

    async def add_user_movie(self, user_id: int, movie_data: UserMovie) -> UserMovie:
        # stmt = insert(UserMovie).values(movie_data).returning(UserMovie.id)
        # res = await self.session.execute(stmt)
        return await self.session.add(movie_data)

    async def get_user_movie(self, user_id: int, movie_id: str) -> Optional[UserMovie]:
        result = await self.session.execute(
            self.session.query(UserMovie).filter(
                and_(UserMovie.user_id == user_id, UserMovie.movie_id == movie_id)
            )
        )
        return result.scalar_one_or_none()

    async def get_user_movies(self, user_id: int, status_filter: Optional[str] = None) -> List[UserMovie]:
        query = self.session.query(UserMovie).filter(UserMovie.user_id == user_id)

        # TODO: Status
        if status_filter:
            if status_filter == "watched":
                query = query.filter(UserMovie.is_watched == True)
            elif status_filter == "liked":
                query = query.filter(UserMovie.is_liked == True)
            elif status_filter == "favorite":
                query = query.filter(UserMovie.is_favorite == True)
            elif status_filter == "watchlist":
                query = query.filter(UserMovie.is_in_watchlist == True)

        result = await self.session.execute(query)
        return result.scalars().all()

    async def update_user_movie(self, user_id: int, movie_id: str, update_data: UserMovieUpdate) -> Optional[UserMovie]:
        db_movie = await self.get_user_movie(user_id, movie_id)
        if not db_movie:
            return None

        update_dict = update_data.model_dump(exclude_unset=True)
        for field, value in update_dict.items():
            setattr(db_movie, field, value)

        await self.session.commit()
        await self.session.refresh(db_movie)
        return db_movie

    async def delete_user_movie(self, user_id: int, movie_id: str) -> bool:
        db_movie = await self.get_user_movie(user_id, movie_id)
        if not db_movie:
            return False

        await self.session.delete(db_movie)
        await self.session.commit()
        return True

    async def get_user_movie_stats(self, user_id: int) -> dict:
        result = await self.session.execute(
            self.session.query(UserMovie).filter(UserMovie.user_id == user_id)
        )
        movies = result.scalars().all()

        return {
            "total": len(movies),
            "watched": len([m for m in movies if m.is_watched]),
            "liked": len([m for m in movies if m.is_liked is True]),
            "disliked": len([m for m in movies if m.is_liked is False]),
            "favorites": len([m for m in movies if m.is_favorite]),
            "in_watchlist": len([m for m in movies if m.is_in_watchlist]),
        }
