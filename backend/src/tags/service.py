import urllib

from src.movies.schemas import MovieSchema
from src.unitofwork import IUnitOfWork


class MovieService:
    async def get_popular_movies(self, uow: IUnitOfWork) -> list[MovieSchema]:
        # async with uow:


        movies = list()
        for i in range(10):
            movies.append(MovieSchema(
                id=i,
                title="Inception",
                poster="uuid",
                banner="uuid",
                description="A mind-bending thriller about dreams within dreams.",
                release_year=2010,
                genre=["Sci-Fi", "Thriller"],
                author= "Christopher Nolan"
            ))

        return movies

    async def get_movie_by_id(self, uow: IUnitOfWork, id: int) -> MovieSchema:
        async with uow:
            movie = await uow.movies.find_by_id(id)
            return movie

    async def get_poster_by_id(self, uow, id):
        return urllib.request.Request("https://www.shutterstock.com/image-vector/no-result-document-file-data-600nw-2293706569.jpg")
