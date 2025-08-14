import logging

from db.repositories.abstract_repo import AbstractRepository
from exceptions.service_error import IncorrectPasswordError, NotFoundError, DatabaseError, AlreadyExistsError, \
    ValidationError
from schemas.users import UserSchema, UserCreate
from utils.jwt_token import verify_password


class UserService:
    def __init__(self, repo: AbstractRepository, logger: logging.Logger):
        self.db = repo
        self.log = logger

    async def validate_user(self, dto: UserCreate) -> UserSchema:
        try:
            user = await self.get_user(dto.username)
            if not user:
                self.log.info(f"User {dto.username} does not exist")
                raise NotFoundError("User not found")

            if not verify_password(dto.password, user.password):
                self.log.info(f"Incorrect password for user {dto.username}")
                raise IncorrectPasswordError("Incorrect password")

            return user
        except Exception as e:
            # await db.rollback()
            self.log.error(f"Error validating user: {e}")
            raise ValidationError(str(e))

    async def is_user_exist(self, username: str) -> bool:
        try:
            # filters = dict()
            # if dto.username:
            #     filters["username"] = dto.username
            # elif dto.email:
            #     filters["email"] = dto.email
            # else:
            #     raise ValidationError("Username or email must be provided")
            return await self.db.is_user_exists(username=username)
        except Exception as e:
            self.log.error(f"Database error: {e}")
            raise DatabaseError(str(e))

    async def get_user(self, username: str) -> UserSchema | None:
        try:
            return await self.db.find_one(username=username)
        except Exception as e:
            self.log.error(f"Database error with getting user: {e}")
            raise DatabaseError(str(e))

    async def create_user(self, dto: UserCreate) -> int | None:
        try:
            if await self.is_user_exist(dto.username):
                raise AlreadyExistsError("User already exists")

            return await self.db.add_one(dto.model_dump())

        except AlreadyExistsError as e:
            self.log.info(f"User {dto.username} already exists")
            raise
        except Exception as e:
            # await db.rollback()
            self.log.error(f"Database error with creating user: {e}")
            raise DatabaseError(str(e))

    # async def update_user(self, user: UserAccount): pass

