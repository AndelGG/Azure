from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import DeclarativeBase


engine = create_async_engine('mysql+aiomysql://root@localhost:3306/azure', echo=True)


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