from pydantic import BaseModel

from schemas.users import UserSchema


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class UserResponse(TokenResponse):
    user: UserSchema

class Payload(BaseModel):
    sub: int
    name: str

