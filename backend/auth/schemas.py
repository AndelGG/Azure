from pydantic import BaseModel

class Create_acc(BaseModel):
    username: str
    email: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str

class Login_token(BaseModel):
    token: str