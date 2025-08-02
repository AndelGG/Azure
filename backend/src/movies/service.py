from gettext import translation

from src.KodikAPI import Translation, MaterialData
from src.movies.schemas import MovieSchema, SearchSchema, SearchShortSchema, TranslationSchema, PopularSchema
from src.tags.schemas import TagsScheme
from src.unitofwork import IUnitOfWork


class MovieService:
    async def get_popular_movies(self, uow: IUnitOfWork, count: int) -> list[PopularSchema]:
        search_response = await uow.movie_api.get_popular(count)

        return [PopularSchema(
            id=material.id,
            slug=f"{material.title_orig}-{material.shikimori_id}" if material.shikimori_id else material.title_orig,
            poster=material.material_data.poster_url if material.material_data else None,
            title=material.title,
            translations=TranslationSchema(id=material.translation.id, title=material.translation.title, type=material.translation.type)
        ) for material in search_response]

    async def get_movie_by_id(self, uow: IUnitOfWork, id: int) -> MovieSchema:
        return MovieSchema(
                id=id,
                title="Inception",
                poster="uuid",
                banner="uuid",
                description="A mind-bending thriller about dreams within dreams.",
                release_year=2010,
                tags=[TagsScheme(id=0, name="Sci-Fi"), TagsScheme(id=1, name="Thriller")],
                author= "Christopher Nolan"
            )

    async def get_movie_by_slug(self, uow, slug: str) -> MovieSchema:
        material = await uow.movie_api.get_one_by_slug(slug)

        parts = slug.split("-")
        if len(parts) == 2:
            material = await uow.movie_api.get_one_anime(parts[1])
        else:
            slug = parts[0].replace('_', '%20').replace(' ', '%20')
            material = await uow.movie_api.get_one_by_slug(slug)

        material_data = material.material_data if material.material_data else MaterialData()

        translations = await self.get_translations_by_id(uow, material.shikimori_id)

        # Обрабатываем seasons - преобразуем словарь в список строк (номера сезонов)
        seasons_list = None
        if hasattr(material, 'seasons') and material.seasons:
            if isinstance(material.seasons, dict):
                # Если seasons это словарь, берем ключи (номера сезонов)
                seasons_list = list(material.seasons.keys())
            elif isinstance(material.seasons, list):
                # Если seasons уже список, используем как есть
                seasons_list = material.seasons

        return MovieSchema(
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
            seasons=seasons_list,  # Используем обработанный список
            countries=material_data.countries if material_data.countries else None,
            iframe_url=material.link,
            type=material.type,
            anime_status=material_data.anime_status if material_data.anime_status else None,
            anime_studios=material_data.anime_studios if material_data.anime_studios else None,
            translations=translations
        )

    async def get_short_by_search(self, uow: IUnitOfWork, search: str, limit: int) -> list[SearchShortSchema]:
        search_response = await uow.movie_api.search(search)
        search_results = list()
        search_slug = set()

        for m in search_response:

            id = m.shikimori_id or m.title_orig

            if id in search_slug:
                continue

            search_results.append(SearchShortSchema(
            id=id,
            slug=f"{m.title_orig}-{m.shikimori_id}" if m.shikimori_id else m.title_orig,
            poster=m.material_data.poster_url if m.material_data else None,
            title=m.title,
            type=m.type if m.material_data else None
            ))

            search_slug.add(id)

        return search_results[:limit]

    async def get_translations_by_id(self, uow: IUnitOfWork, id: int) -> list[TranslationSchema]:
        translations = await uow.movie_api.get_translations_by_id(id)

        return [TranslationSchema(
            id=material.translation.id if material.translation else None,
            title=material.translation.title if material.translation else None,
            type=material.translation.type if material.translation else None
        ) for material in translations]

