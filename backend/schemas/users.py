from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    # TODO: field length
    username: str | None
    email: str | None


class UserCreate(UserBase):
    password: str

class UserSchema(UserCreate):
    id: int