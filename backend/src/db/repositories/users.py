from src.db.repositories.abstract_repo import SQLAlchemyRepository
from src.models.users import User


class UserRepository(SQLAlchemyRepository):
    model = User