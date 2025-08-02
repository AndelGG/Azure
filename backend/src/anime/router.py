
from fastapi.routing import APIRouter

from src.anime.schemas import AnimeSchema
from src.anime.service import AnimeService
from src.dependencies import UOWDep

router = APIRouter(prefix="/anime", tags=["anime"])

@router.get("/popular")
async def get_popular_movies(uow: UOWDep, count: int = 12) -> list[AnimeSchema]:
    movies = await AnimeService().get_popular_anime(uow, count)
    return movies