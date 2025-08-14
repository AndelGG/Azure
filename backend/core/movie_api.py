from urllib.parse import urlencode

import httpx
from abc import ABC, abstractmethod

from schemas.KodikAPI import SearchResponse, Material


class MovieAPI(ABC):
    @abstractmethod
    async def get_one_by_slug(self, name: str):
        pass
    @abstractmethod
    async def get_popular(self, count: int, spec: dict = "") -> list[Material]:
        pass
    @abstractmethod
    async def get_one_anime(self, id: str):
        pass
    @abstractmethod
    async def get_translations_by_id(self, id: int):
        pass
    @abstractmethod
    async def get_series_by_id(self, id: int, trans_id: int):
        pass

class KodikAPI(MovieAPI):
    def __init__(self, base_url: str):
        self.base_url = base_url

    async def get_one_by_slug(self, name: str):
        async with httpx.AsyncClient() as client:
            url = f"{self.base_url.replace("route", "search")}&title_orig={name}&limit=20&with_material_data=true&with_episodes=true"
            response = await client.get(url)
            movie = SearchResponse(**response.json())
# TODO: return 404 if error
            for m in movie.results:
                if m.shikimori_id is None:
                    return m
            return None

    async def get_one_anime(self, id: str):
        async with httpx.AsyncClient() as client:
            url = f"{self.base_url.replace("route", "search")}&shikimori_id={id}&limit=1&with_material_data=true&with_episodes=true"
            response = await client.get(url)
            movie = SearchResponse(**response.json())
            # return 404 if error
            return movie.results[0]

    async def get_popular(self, count: int, spec: dict = "") -> list[Material]:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url.replace("route", "list")}&limit={count}&with_material_data=true&{urlencode(spec)}")

            popular = SearchResponse(**response.json())

            return popular.results

    async def search(self, query: str, prompt: str = ""):
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url.replace('route', 'search')}&title={query}&with_material_data=true")
            search_response = SearchResponse(**response.json())
            return search_response.results

    async def get_translations_by_id(self, id: int):
        async with httpx.AsyncClient() as client:
            url = f"{self.base_url.replace('route', 'search')}&shikimori_id={id}"
            response = await client.get(url)
            translations = SearchResponse(**response.json())

            return translations.results

    async def get_series_by_id(self, id: int, trans_id: int):
        async with httpx.AsyncClient() as client:
            url = f"{self.base_url.replace('route', 'search')}&shikimori_id={id}&with_episodes=true&prioritize_translations={trans_id}"
            response = await client.get(url)
            series = SearchResponse(**response.json())
            return series.results[0]
