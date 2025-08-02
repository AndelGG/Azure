from src.KodikAPI import MaterialData
from src.anime.schemas import AnimeSchema
from src.movies.schemas import TranslationSchema
from src.tags.schemas import TagsScheme
from src.unitofwork import IUnitOfWork


class AnimeService:
    async def get_popular_anime(self, uow: IUnitOfWork, count: int) -> list[AnimeSchema]:
        search_response = await uow.movie_api.get_popular(count, {"has_field":"shikimori_id"})

        # TODO: kill this
        seasons_list = None
        if hasattr(search_response, 'seasons') and search_response.seasons:
            if isinstance(search_response.seasons, dict):
                # Если seasons это словарь, берем ключи (номера сезонов)
                seasons_list = list(search_response.seasons.keys())
            elif isinstance(search_response.seasons, list):
                # Если seasons уже список, используем как есть
                seasons_list = search_response.seasons

        # TODO: check fild exists
        return [AnimeSchema(
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
            seasons = seasons_list,  # Используем обработанный список
            anime_status = material.material_data.anime_status if material.material_data.anime_status else None,
            shikimori_rating=material.material_data.shikimori_rating if material.material_data.shikimori_rating else None,
        ) for material in search_response]