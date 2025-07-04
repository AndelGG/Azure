import urllib.request

from fastapi.routing import APIRouter
from fastapi.responses import StreamingResponse

from src.movies.schemas import Movie

router = APIRouter(prefix="/movies", tags=["movies"])

@router.get("/popular")
async def get_popular_movies() -> list[Movie]:
    movies = list()
    for i in range(10):
        movies.append(Movie(
        id=i,
        title="Inception",
        poster="uuid",
        description="A mind-bending thriller about dreams within dreams.",
        release_year=2010,
        genre="Sci-Fi"
        ))

    return movies

@router.get("/{id}")
async def get_movie_by_id(id: int) -> Movie:
    return Movie(
        id=id,
        title="Inception",
        poster="uuid",
        description="A mind-bending thriller about dreams within dreams.",
        release_year=2010,
        genre="Sci-Fi"
    )

@router.get("/posters/{id}")
async def get_poster_by_id(id: str) -> StreamingResponse:
    image = urllib.request.Request("https://www.shutterstock.com/image-vector/no-result-document-file-data-600nw-2293706569.jpg")
    return StreamingResponse(urllib.request.urlopen(image), media_type="image/jpeg")