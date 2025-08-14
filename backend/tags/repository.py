from src.repository import SQLAlchemyRepository
from src.movies.models import Movies


class MovieRepository(SQLAlchemyRepository):
    model = Movies