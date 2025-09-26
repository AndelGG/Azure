import logging

from exceptions.service_error import NotFoundError, AlreadyExistsError, IncorrectPasswordError, \
    ValidationError, TokenTypeError, VerificationError
from schemas.auth import TokenResponse, UserResponse, Payload
from schemas.users import UserCreate
from service.users import UserService
from utils.jwt_token import get_password_hash, verify_token, TokenType, \
    create_tokens


class AuthService:
    def __init__(self, users: UserService, logger: logging.Logger):
        self.users = users
        self.log = logger

    async def login(self, dto: UserCreate) -> UserResponse | None:
        try:
            user = await self.users.validate_user(dto)
            payload = Payload(
                sub=user.id,
                name=user.username,
            )
            tokens = create_tokens(payload)
            return UserResponse(
                user=user,
                **tokens.model_dump()
            )
        except (IncorrectPasswordError, NotFoundError, ValidationError) as e:
            raise
        except Exception as e:
            self.log.error(f"Unexpected error: {e}")
            raise

    async def register(self, dto: UserCreate):
        try:
            dto.password = get_password_hash(dto.password)

            user_id = await self.users.create_user(dto)

            payload = Payload(
                sub=user_id,
                name=dto.username,
            )

            return create_tokens(payload)
        except AlreadyExistsError as e:
            raise
        except Exception as e:
            self.log.error(f"Unexpected error: {e}")
            raise

    async def get_new_tokens(self, token: str) -> TokenResponse:
        try:
            payload = verify_token(token, TokenType.REFRESH)

            if not await self.users.is_user_exist(payload.name):
                self.log.info(f"User with token: {token}, not found")
                raise NotFoundError("User not found")

            return create_tokens(payload)
        except (TokenTypeError, VerificationError) as e:
            self.log.error(f"Token type error: {e}")
            raise
        except Exception as e:
            self.log.error(f"Token type error: {e}, asserting REFRESH")
            raise

    def validate_token(self, token: str):
        try:
            user = verify_token(
                token=token,
                token_type=TokenType.ACCESS
            )

            return user

        except (TokenTypeError, VerificationError) as e:
            self.log.error(f"Token type error: {e}, asserting ACCESS")
            raise
        except Exception as e:
            self.log.error(f"Unexpected error: {e}")
            raise