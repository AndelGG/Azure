from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

from src.core.config import settings

engine = create_async_engine(settings.PGSQL_DB_URL, echo=True)

AsyncSessionLocal = async_sessionmaker(
    engine, expire_on_commit=False,
)

class Base(DeclarativeBase):
    pass

async def database():
    async with AsyncSessionLocal() as db:
        try:
            yield db
            await db.commit()
        except Exception:
            await db.rollback()
            raise
        finally:
            await db.close()
