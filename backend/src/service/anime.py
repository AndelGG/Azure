from src.core.movie_api import MovieAPI
from src.schemas.anime import AnimeSchema, AnimeBannerSchema, ShortAnimeSchema, EpisodeSchema, AnimeTranslationSchema
from src.schemas.KodikAPI import MaterialData
from src.schemas.tags import TagsScheme


async def _get_translations_by_id(self, id: int) -> list[AnimeTranslationSchema]:
    translations = await self.movie_api.get_translations_by_id(id)

    return [AnimeTranslationSchema(
        id=material.translation.id if material.translation else None,
        title=material.translation.title if material.translation else None,
        episodes_count=material.episodes_count if material.episodes_count else None,
        # episodes=material.translation.episodes if material.translation and material.translation.episodes else []
    ) for material in translations]


class AnimeService:
    def __init__(self, movie_api: MovieAPI):
        self.movie_api = movie_api
    
    
    async def get_banner_anime(self, count: int) -> list[AnimeBannerSchema]:
        search_response = await self.movie_api.get_popular(min(count * 3, 100), {"has_field":"shikimori_id"})

        # TODO: check field exists
        search_results = list()
        search_slug = set()

        for material in search_response:

            id = material.shikimori_id or material.title_orig

            if id in search_slug:
                continue
            search_results.append(AnimeBannerSchema(
            id=int(material.shikimori_id) if material.shikimori_id else 0,
            slug=f"{material.title_orig}-{material.shikimori_id}" if material.shikimori_id else material.title_orig,
            poster=material.material_data.poster_url if material.material_data else None,
            title=material.title,
            age_rating = material.material_data.minimal_age if material.material_data.minimal_age else 16,
            description = material.material_data.description if material.material_data.description else None,
            tags = [TagsScheme(id=i, genre=tag) for i, tag in enumerate(
                material.material_data.all_genres or []
            )] if material.material_data.all_genres else None,
            created_at = material.created_at.isoformat() if material.created_at else None,
            updated_at = material.updated_at.isoformat() if material.updated_at else None,
            anime_status = material.material_data.anime_status if material.material_data.anime_status else None,
            shikimori_rating=material.material_data.shikimori_rating if material.material_data.shikimori_rating else None,
        ))
            search_slug.add(id)

        # TODO: check if count is less than search_results
        return search_results[:count]

    async def get_translation(self, shiki_id, translation_id):
        translation = await self.movie_api.get_series_by_id(shiki_id, translation_id)
        if not translation:
            return None

        return [EpisodeSchema(
            episode=int(key),
            link=material
        ) for key, material in translation.seasons[str(translation.last_season)].episodes.items()]


    async def get_popular_anime(self, count: int) -> list[ShortAnimeSchema]:
        search_response = await self.movie_api.get_popular(min(count * 3, 100), {"has_field":"shikimori_id"})
        search_results = list()
        search_slug = set()

        for material in search_response:

            id = material.shikimori_id or material.title_orig

            if id in search_slug:
                continue

            search_results.append(ShortAnimeSchema(
                id=id,
                slug=f"{material.title_orig}-{material.shikimori_id}" if material.shikimori_id else material.title_orig,
                poster=material.material_data.poster_url if material.material_data else None,
                title=material.title,
                translations=AnimeTranslationSchema(id=material.translation.id, title=material.translation.title, episodes_count=material.episodes_count) if material.translation else None,
                type=material.type,
            ))

            search_slug.add(id)

        return search_results[:count]

    async def get_anime_by_slug(self, slug: str) -> AnimeSchema:

        parts = slug.split("-")
        if len(parts) == 2:
            material = await self.movie_api.get_one_anime(parts[1])
        else:
            slug = parts[0].replace('_', '%20').replace(' ', '%20')
            material = await self.movie_api.get_one_by_slug(slug)

        material_data = material.material_data if material.material_data else MaterialData()

        if material.shikimori_id:
            translations = await _get_translations_by_id(self, material.shikimori_id)
        else:
            translations = None

        return AnimeSchema(
            id=material.id,
            slug=material.title_orig or "unknown-slug",
            age_rating=material_data.minimal_age if material_data.minimal_age else 16,
            title=material.title,
            description=material_data.description if material_data.description else None,
            poster=material_data.poster_url if material_data.poster_url else None,
            tags=[TagsScheme(id=i, genre=tag) for i, tag in enumerate(
                material_data.all_genres or []
            )] if material_data.all_genres else None,
            blocked_countries=material.blocked_countries,
            year=material.year,
            duration=material_data.duration if material_data.duration else None,
            episodes_count=material.episodes_count,
            kinopoisk_rating=material_data.kinopoisk_rating if material_data.kinopoisk_rating else None,
            created_at=material.created_at.isoformat() if material.created_at else None,
            updated_at=material.updated_at.isoformat() if material.updated_at else None,
            screenshots=material.screenshots,
            countries=material_data.countries if material_data.countries else None,
            iframe_url=material.link,
            type=material.type,
            anime_status=material_data.anime_status if material_data.anime_status else None,
            anime_studios=material_data.anime_studios if material_data.anime_studios else None,
            translations=translations
        )

    async def get_short_by_search(self, search: str, limit: int) -> list[ShortAnimeSchema]:
        search_response = await self.movie_api.search(search)
        search_results = list()
        search_slug = set()

        for m in search_response:

            id = m.shikimori_id or m.title_orig

            if id in search_slug:
                continue

            search_results.append(ShortAnimeSchema(
            id=id,
            slug=f"{m.title_orig}-{m.shikimori_id}" if m.shikimori_id else m.title_orig,
            poster=m.material_data.poster_url if m.material_data else None,
            title=m.title,
            type=m.type if m.material_data else None,
            translations= None,
            ))

            search_slug.add(id)

        return search_results[:limit]