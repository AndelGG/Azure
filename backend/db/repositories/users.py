from db.repositories.abstract_repo import SQLAlchemyRepository
from models.users import User


class UserRepository(SQLAlchemyRepository):
    model = User