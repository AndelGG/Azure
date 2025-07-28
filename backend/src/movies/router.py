import urllib.request

from fastapi.routing import APIRouter
from fastapi.responses import StreamingResponse

from src.KodikAPI import SearchResponse
from src.dependencies import UOWDep
from src.movies.schemas import MovieSchema, SearchSchema
from src.movies.service import MovieService

router = APIRouter(prefix="/movies", tags=["movies"])

@router.get("/popular")
async def get_popular_movies(uow: UOWDep, count: int = 12) -> list[SearchSchema]:
    movies = await MovieService().get_popular_movies(uow, count)
    return movies

# @router.get("/{id}")
# async def get_movie_by_id(uow: UOWDep, id: int) -> MovieSchema:
#     movie = await MovieService().get_movie_by_id(uow, id)
#     return movie

@router.get("/short-search/")
async def get_short_by_search(uow: UOWDep, search: str) -> list[SearchSchema]:
    search_response = await MovieService().get_short_by_search(uow, search)
    return search_response


@router.get("/{slug}")
async def get_movie_by_slug(uow: UOWDep, slug: str) -> MovieSchema:
    movie = await MovieService().get_movie_by_slug(uow, slug)
    return movie