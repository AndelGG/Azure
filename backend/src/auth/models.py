from sqlalchemy import Column, Integer, String, JSON
from src.db import Base

class User(Base):
    __tablename__="user"

    id=Column(Integer, primary_key=True, autoincrement=True)
    email=Column(String(100))
    username=Column(String(50))
    password=Column(String(225))
    film_subs=Column(JSON)
    num_watch=Column(Integer)
    view_movie=Column(JSON)
    token=Column(String(225))