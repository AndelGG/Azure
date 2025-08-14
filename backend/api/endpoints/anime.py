from fastapi.routing import APIRouter
from fastapi import Depends

from deps.auth_init import verify_user
from schemas.anime import AnimeSchema, AnimeBannerSchema, ShortAnimeSchema
from deps.dependencies import AnimeServiceDep
from schemas.anime import EpisodeSchema

router = APIRouter(prefix="/anime", tags=["anime"])

@router.get("/banner")
async def get_banner_anime(
        ani: AnimeServiceDep,
        count: int = 12
) -> list[AnimeBannerSchema]:
    anime = await ani.get_banner_anime(count)
    return anime

@router.get("/translation")
async def get_translation(ani: AnimeServiceDep, shiki_id: int, translation_id: int) -> list[EpisodeSchema]:
    translation_id = await ani.get_translation(shiki_id, translation_id)
    return translation_id

@router.get("/popular")
async def get_popular_anime(
        ani: AnimeServiceDep,
        count: int = 12
) -> list[ShortAnimeSchema]:
    movies = await ani.get_popular_anime(count)
    return movies

@router.get("/short-search/")
async def get_by_search(ani: AnimeServiceDep, search: str, limit: int = 5) -> list[ShortAnimeSchema]:
    search_response = await ani.get_short_by_search(search, limit)
    return search_response

@router.get("/title/{slug}")
async def get_anime_by_slug(slug: str, ani: AnimeServiceDep, _=Depends(verify_user)) -> AnimeSchema:
    movie = await ani.get_anime_by_slug(slug)
    return movie



