import urllib.request

from fastapi.routing import APIRouter
from fastapi.responses import StreamingResponse

from src.dependencies import UOWDep
from src.movies.schemas import MovieSchema
from src.movies.service import MovieService

router = APIRouter(prefix="/movies", tags=["movies"])

@router.get("/{id}")
async def get_tag_by_id(uow: UOWDep, id: int) -> MovieSchema:
    movie = await MovieService().get_movie_by_id(uow, id)
    return movie