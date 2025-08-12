from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.config import settings
from src.db.db import database
from src.core.movie_api import KodikAPI
from src.service.anime import AnimeService

DatabaseDep = Annotated[AsyncSession, Depends(database)]

def get_kodik_api() -> KodikAPI:
    return KodikAPI(f"https://kodikapi.com/route?token={settings.KODIK_API_KEY}")

def get_anime_service() -> AnimeService:
    return AnimeService(get_kodik_api())

AnimeServiceDep = Annotated[AnimeService, Depends(get_anime_service)]

# async def get_auth_use_cases(
#     db: DatabaseDep,
#     redis_client: RedisDep,
# ) -> AuthUseCases:
#     return AuthUseCases(
#         auth_service=AuthService(),
#         user_service=UserService(),
#         database=db,
#         redis_client=redis_client
#     )
#
# AuthUseCasesDep = Depends(get_auth_use_cases)