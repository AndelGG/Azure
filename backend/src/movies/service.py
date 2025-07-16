import urllib

from src.movies.schemas import MovieSchema
from src.unitofwork import IUnitOfWork


class MovieService:
    async def get_popular_movies(self, uow: IUnitOfWork) -> list[MovieSchema]:
        movies = list()
        for i in range(10):
            movies.append(MovieSchema(
                id=i,
                title="Inception",
                poster="uuid",
                description="A mind-bending thriller about dreams within dreams.",
                release_year=2010,
                genre="Sci-Fi"
            ))

        return movies

    async def get_movie_by_id(self, uow: IUnitOfWork, id: int) -> MovieSchema:
        return MovieSchema(
            id=id,
            title="Inception",
            poster="uuid",
            description="A mind-bending thriller about dreams within dreams.",
            release_year=2010,
            genre="Sci-Fi"
        )

    async def get_poster_by_id(self, uow, id):
        return urllib.request.Request("https://www.shutterstock.com/image-vector/no-result-document-file-data-600nw-2293706569.jpg")
