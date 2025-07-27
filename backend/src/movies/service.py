from src.movies.schemas import MovieSchema, SearchSchema
from src.tags.schemas import TagsScheme
from src.unitofwork import IUnitOfWork


class MovieService:
    async def get_popular_movies(self, uow: IUnitOfWork, count: int) -> list[SearchSchema]:
        search_response = await uow.movie_api.get_popular(count)

        return [SearchSchema(
            id=i,
            slug=material.title_orig or "unknown-slug",
            poster=material.material_data.poster_url if material.material_data else None,
        ) for i, material in enumerate(search_response)]

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
        # TODO: KodikID
        return MovieSchema(
            id=1,
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
            updatedAt=material.updated_at.isoformat() if material.updated_at else None,
            screenshots=material.screenshots,
            seasons=material.seasons,
            countries=material.material_data.countries if material.material_data else None
        )

