from abc import ABC, abstractmethod
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select

from models.users import User


class AbstractUserRepository(ABC):
    @abstractmethod
    async def add_one(self, data) -> int:
        pass

    @abstractmethod
    async def find_one(self, **filter_by) -> User:
        pass

    @abstractmethod
    async def is_user_exists(self, **filter_by) -> bool:
        pass

class SQLAlchemyUserRepository(AbstractUserRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def add_one(self, data: dict) -> int:
        stmt = insert(User).values(**data).returning(User.id)
        res = await self.session.execute(stmt)
        return res.scalar_one()

    # async def edit_one(self, id: int, data: dict) -> int:
    #     stmt = update(self.model).values(**data).filter_by(id=id).returning(self.model.id)
    #     res = await self.session.execute(stmt)
    #     return res.scalar_one()

    # async def find_all(self):
    #     stmt = select(self.model)
    #     res = await self.session.execute(stmt)
    #     res = [row[0].to_read_model() for row in res.all()]
    #     return res

    async def find_one(self, **filter_by) -> User:
        stmt = select(User).filter_by(**filter_by)
        res = await self.session.execute(stmt)
        res = res.scalar_one_or_none()
        # if res:
            # return res.to_read_model()
        return res
        # return None

    async def is_user_exists(self, **filter_by) -> bool:
        stmt = select(User).filter_by(**filter_by)
        res = await self.session.execute(stmt)
        return res.scalar_one_or_none() is not None