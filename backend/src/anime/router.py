
from fastapi.routing import APIRouter

from src.anime.schemas import AnimeSchema, AnimeBannerSchema, ShortAnimeSchema
from src.anime.service import AnimeService
from src.dependencies import UOWDep
from src.anime.schemas import EpisodeSchema

router = APIRouter(prefix="/anime", tags=["anime"])

@router.get("/banner")
async def get_banner_anime(uow: UOWDep, count: int = 12) -> list[AnimeBannerSchema]:
    anime = await AnimeService().get_banner_anime(uow, count)
    return anime
@router.get("/translation")
async def get_translation(uow: UOWDep, shiki_id: int, translation_id: int) -> list[EpisodeSchema]:
    translation_id = await AnimeService().get_translation(uow, shiki_id, translation_id)
    return translation_id

@router.get("/popular")
async def get_popular_anime(uow: UOWDep, count: int = 12) -> list[ShortAnimeSchema]:
    movies = await AnimeService().get_popular_anime(uow, count)
    return movies

@router.get("/short-search/")
async def get_by_search(uow: UOWDep, search: str, limit: int = 5) -> list[ShortAnimeSchema]:
    search_response = await AnimeService().get_short_by_search(uow, search, limit)
    return search_response


@router.get("/title/{slug}")
async def get_anime_by_slug(uow: UOWDep, slug: str) -> AnimeSchema:
    movie = await AnimeService().get_anime_by_slug(uow, slug)
    return movie