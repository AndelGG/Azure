from db.repositories.user_movies import UserMovieRepository


class UserMoviesService:

    def __init__(self, movie: UserMovieRepository):
        self.movie = movie

    async def update_status(self, user_id: int, movie_id: str, status: str):
        try:
            return await self.movie.add_user_movie(user_id, movie_id)
        except Exception as e:
            self.log.error(f"Database error with updating status: {e}")
            raise DatabaseError(str(e))

