from fastapi import APIRouter, Depends, HTTPException
from db import database
from sqlalchemy.ext.asyncio import AsyncSession
from auth.schemas import Create_acc, LoginRequest, Login_token
from auth.utils import get_watched_films_func, create_user_accaunt_func
from auth.jwt_token import login_for_access_token


auth_router=APIRouter(tags=["Auth_block"])


@auth_router.get("/get_watched_films")
async def get_watched_films(ident: int, db: AsyncSession=Depends(database)):
    return await get_watched_films_func(ident, db)


@auth_router.post("/create_accaunt")
async def create_user_accaunt(form: Create_acc, db: AsyncSession=Depends(database)):
    return await create_user_accaunt_func(form, db)


@auth_router.get("/login_with_token")
async def login_with_token(login: str, db: AsyncSession=Depends(database)):
    # Создаем объект, совместимый с OAuth2PasswordRequestForm
    # class FormData:
    #     def __init__(self, username: str, password: str):
    #         self.username = username
    #         self.password = password

    # form_data = FormData(login_data.username, login_data.password)
    return await login_for_access_token(login, db)