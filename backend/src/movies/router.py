import urllib.request

from fastapi.routing import APIRouter
from fastapi.responses import StreamingResponse

from src.KodikAPI import SearchResponse
from src.dependencies import UOWDep
from src.movies.schemas import MovieSchema, SearchSchema, SearchShortSchema, PopularSchema
from src.movies.service import MovieService

router = APIRouter(prefix="/anime", tags=["movies"])

