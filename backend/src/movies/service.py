from src.movies.schemas import MovieSchema, SearchSchema, SearchShortSchema
from src.tags.schemas import TagsScheme
from src.unitofwork import IUnitOfWork


class MovieService:
    async def get_popular_movies(self, uow: IUnitOfWork, count: int) -> list[SearchSchema]:
        search_response = await uow.movie_api.get_popular(count)

        return [SearchSchema(
            id=material.id,
            slug=material.title_orig or "unknown-slug",
            poster=material.material_data.poster_url if material.material_data else None,
            title=material.title,
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
        material = await uow.movie_api.get_one(slug)

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
            age_rating=material.material_data.minimal_age if material.material_data else None,
            title=material.title,
            description=material.material_data.description if material.material_data else None,
            poster=material.material_data.poster_url if material.material_data else None,
            tags=[TagsScheme(id=i, genre=tag) for i, tag in enumerate(
                material.material_data.all_genres or []
            )] if material.material_data and material.material_data.all_genres else None,
            blocked_countries=material.blocked_countries,
            year=material.year,
            duration=material.material_data.duration if material.material_data else None,
            episodes_count=material.episodes_count,
            kinopoisk_rating=material.material_data.kinopoisk_rating if material.material_data else None,
            created_at=material.created_at.isoformat() if material.created_at else None,
            updated_at=material.updated_at.isoformat() if material.updated_at else None,
            screenshots=material.screenshots,
            seasons=seasons_list,  # Используем обработанный список
            countries=material.material_data.countries if material.material_data else None,
            iframe_url=material.link,
            type=material.type,
            anime_status=material.material_data.anime_status if material.material_data else None,
            anime_studios=material.material_data.anime_studios if material.material_data.anime_studios else None,
        )

    async def get_short_by_search(self, uow: IUnitOfWork, search: str) -> list[SearchShortSchema]:
        search_response = await uow.movie_api.search(search, limit=5)

        return [SearchShortSchema(
            id=material.id,
            slug=material.title_orig or "unknown-slug",
            poster=material.material_data.poster_url if material.material_data else None,
            title=material.title,
            type=material.type if material.material_data else None,

        ) for material in search_response]
