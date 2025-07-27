from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import DeclarativeBase

from src.config import settings

engine = create_async_engine(settings.DB_URL, echo=True)


AsyncSessionLocal = async_sessionmaker(
    engine, expire_on_commit=False,
)

class Base(DeclarativeBase):
    pass


async def database():
    async with AsyncSessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()