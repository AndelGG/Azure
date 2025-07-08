from auth.models import User
from fastapi import HTTPException
from sqlalchemy.future import select
from sqlalchemy import or_, update, delete
from auth.jwt_token import get_password_hash, access_token_for_func


async def get_watched_films_func(ident, db):
    query = select(User).where(User.id == ident)
    result = await db.execute(query)
    user = result.scalars().first()

    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    return {
        "all movies": user.num_watch,
        "films": user.view_movie
        }


async def create_user_accaunt_func(form, db):
    result = await get_unicom(form, db)
    
    if result is None:
        access_token = await access_token_for_func(form, db)
        user=User(
            username=form.username,
            email=form.email,
            password=get_password_hash(form.password),
            token=access_token['access_token']
        )

        db.add(user)
        await db.commit()
        await db.refresh(user)
        return {
            "message":"Accaunt created successful",
            "Accaunt datas": [user.username, user.email]
            }
    else:
        return {"Error": "User with this email or username has already created"}


async def get_unicom(form, db):
    query = select(User).where(or_(User.email == form.email, User.username == form.username))
    result = await db.execute(query)
    user = result.scalars().one_or_none()
    
    if user is None:
        return None
    
    return user