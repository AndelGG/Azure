import urllib.request

from fastapi.routing import APIRouter
from fastapi.responses import StreamingResponse

from src.dependencies import UOWDep
from src.movies.schemas import MovieSchema
from src.movies.service import MovieService

router = APIRouter(prefix="/movies", tags=["movies"])

@router.get("/popular")
async def get_popular_movies(uow: UOWDep) -> list[MovieSchema]:
    movies = await MovieService().get_popular_movies(uow)
    return movies

@router.get("/{id}")
async def get_movie_by_id(uow: UOWDep, id: int) -> MovieSchema:
    movie = await MovieService().get_movie_by_id(uow, id)
    return movie

@router.get("/posters/{id}")
async def get_poster_by_id(uow: UOWDep, id: str) -> StreamingResponse:
    image = await MovieService().get_poster_by_id(uow, id)
    return StreamingResponse(urllib.request.urlopen(image), media_type="image/jpeg")