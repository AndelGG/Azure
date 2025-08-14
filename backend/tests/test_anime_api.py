import pytest
from fastapi.testclient import TestClient
from fastapi import status

from schemas.anime import AnimeSchema


@pytest.mark.unit
class TestAnimeEndpoints:

    @pytest.mark.asyncio
    async def test_get_banner_anime_success(self, client: TestClient):
        url = '/anime/banner'
        response = client.get(url)

        data = response.json()

        assert response.status_code == status.HTTP_200_OK
        assert len(data) == 12
        assert data[0]["id"] is not None

    @pytest.mark.asyncio
    async def test_get_translation_success(self, client: TestClient):
        url = '/anime/translation?shiki_id=48736&translation_id=609'
        response = client.get(url)

        data = response.json()

        assert response.status_code == status.HTTP_200_OK
        assert data[0]["link"] == "//kodik.info/seria/946822/17f111bb52cdd7d29b042ff075e1ec78/720p"
        assert len(data) == 12

    @pytest.mark.asyncio
    async def test_get_popular_anime_success(self, client: TestClient):
        url = '/anime/popular'
        response = client.get(url)

        data = response.json()

        assert response.status_code == status.HTTP_200_OK
        assert len(data) == 12
        assert data[0]["id"] is not None

    @pytest.mark.asyncio
    async def test_get_by_search_success(self, client: TestClient):
        url = "/anime/short-search/?search=фарфоровая%20кукла"
        response = client.get(url)

        data = response.json()

        assert response.status_code == status.HTTP_200_OK
        assert len(data) == 5
        assert data[0]["id"] is not None

    @pytest.mark.asyncio
    async def test_get_anime_by_slug_success(self, client: TestClient, access_token):
        url = "/anime/title/Sono_Bisque_Doll_wa_Koi_o_Suru-48736"

        response = client.get(url, headers={"Authorization": f"Bearer {access_token}"})

        anime = AnimeSchema(**response.json())

        assert response.status_code == status.HTTP_200_OK

        assert anime.id == "serial-51020"
        assert anime.slug == "Sono Bisque Doll wa Koi o Suru"
        assert anime.age_rating == 18
        assert anime.poster == "https://st.kp.yandex.net/images/film_big/4836543.jpg"
        assert anime.type == "anime-serial"
        assert anime.anime_status == "released"

        assert anime.year == 2022
        assert anime.duration == 23
        assert anime.episodes_count == 12
        assert anime.kinopoisk_rating == 7.8
        assert anime.shikimori_rating is None

        assert len(anime.tags) > 2
        assert any([tag.genre == "драма" for tag in anime.tags])
        assert any([tag.genre == "комедия" for tag in anime.tags])

        assert len(anime.blocked_countries) == 0
        assert anime.countries == ["Япония"]
        assert anime.anime_studios == ["CloverWorks"]

        assert len(anime.screenshots) > 1
        assert "https://i.kodik.biz/screenshots/seria/1147358/1.jpg" in anime.screenshots

        assert len(anime.translations) >= 2
        assert any([t.title == "AniDUB" for t in anime.translations])
        assert any([t.title == "Amazing Dubbing" for t in anime.translations])

        assert anime.description is not None
        assert len(anime.description) > 100
        assert "Годзё" in anime.description
        assert "Марин" in anime.description
