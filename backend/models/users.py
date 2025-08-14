from sqlalchemy import Column, Integer, String
from db.db import Base
from schemas.users import UserSchema


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(100), unique=True, nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    #
    # # Бизнес-логика пользователя
    # film_subs = Column(JSON, default=list)
    # num_watch = Column(Integer, default=0)
    # view_movie = Column(JSON, default=list)
    #
    # # Поля для аутентификации
    # is_active = Column(Integer, default=1)
    # token = Column(String(255), nullable=True)
    def to_read_model(self) -> UserSchema:
        return UserSchema(
            id=self.id,
            username=self.username,
            email=self.email,
            password=self.password
        )