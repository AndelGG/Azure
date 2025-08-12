from fastapi.routing import APIRouter

from tempf.movies.schemas import MovieSchema
from tempf.movies.service import MovieService

router = APIRouter(prefix="/movies", tags=["movies"])

@router.get("/{id}")
async def get_tag_by_id(uow: UOWDep, id: int) -> MovieSchema:
    movie = await MovieService().get_movie_by_id(uow, id)
    return movie