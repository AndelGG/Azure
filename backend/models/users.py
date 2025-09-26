from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from db.db import Base
from schemas.users import UserSchema


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(100), unique=True, nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)

    movies = relationship("UserMovie", back_populates="user", cascade="all, delete-orphan")

    def to_read_model(self) -> UserSchema:
        return UserSchema(
            id=self.id,
            username=self.username,
            email=self.email,
            password=self.password
        )

