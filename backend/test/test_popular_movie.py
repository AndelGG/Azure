import pytest
from httpx import AsyncClient
from fastapi import status
from unittest.mock import patch, AsyncMock
from src.main import app


@pytest.mark.asyncio
async def test_popular_movies_endpoint():
    """Test the popular movies endpoint with proper FastAPI testing"""

    # Mock the MovieService to return test data
    mock_movies = [
        {"id": 1, "title": "Test Movie 1", "slug": "test-movie-1"},
        {"id": 2, "title": "Test Movie 2", "slug": "test-movie-2"},
        {"id": 3, "title": "Test Movie 3", "slug": "test-movie-3"}
    ]

    with patch('src.movies.router.MovieService') as mock_service:
        # Setup the mock
        mock_service_instance = AsyncMock()
        mock_service.return_value = mock_service_instance
        mock_service_instance.get_popular_movies.return_value = mock_movies

        # Create async client and make request
        async with AsyncClient(app=app, base_url="http://test") as client:
            response = await client.get("/movies/popular")

            # Assertions
            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert len(data) == 3
            assert data[0]["title"] == "Test Movie 1"

            # Verify the service was called correctly
            mock_service_instance.get_popular_movies.assert_called_once()


@pytest.mark.asyncio
async def test_popular_movies_with_count_parameter():
    """Test the popular movies endpoint with count parameter"""

    mock_movies = [{"id": i, "title": f"Movie {i}", "slug": f"movie-{i}"} for i in range(1, 6)]

    with patch('src.movies.router.MovieService') as mock_service:
        mock_service_instance = AsyncMock()
        mock_service.return_value = mock_service_instance
        mock_service_instance.get_popular_movies.return_value = mock_movies

        async with AsyncClient(app=app, base_url="http://test") as client:
            response = await client.get("/movies/popular?count=5")

            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert len(data) == 5


if __name__ == '__main__':
    # Run with pytest instead of unittest
    pytest.main([__file__, "-v"])
