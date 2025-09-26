from typing import Annotated

import redis
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from db.db import database
from core.movie_api import KodikAPI
from service.anime import AnimeService
from service.cache import CacheManager

DatabaseDep = Annotated[AsyncSession, Depends(database)]

def get_kodik_api() -> KodikAPI:
    return KodikAPI(f"https://kodikapi.com/route?token={settings.KODIK_API_KEY}")

def get_anime_service() -> AnimeService:
    return AnimeService(get_kodik_api())

AnimeServiceDep = Annotated[AnimeService, Depends(get_anime_service)]

async def get_cache_service():
    redis_client = await redis.asyncio.Redis(host=settings.REDIS_HOST, port=settings.REDIS_PORT)
    return CacheManager(redis_client)

CacheDep = Annotated[CacheManager, Depends(get_cache_service)]