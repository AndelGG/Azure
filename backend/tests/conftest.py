import os
import sys

sys.path.insert(0, os.path.abspath('.'))
sys.path.insert(0, os.path.abspath('..'))

from schemas.auth import Payload

import pytest
import asyncio
from fastapi.testclient import TestClient
from main import app
from utils.jwt_token import create_tokens

# class MockMovieAPI:
#     """Mock Movie API for testing"""
#     def __init__(self):
#         self.get_popular = AsyncMock()
#         self.get_translations_by_id = AsyncMock()
#         self.search = AsyncMock()
#
#     async def get_popular(self, count: int, filters: dict = None):
#         return []
#
#     async def get_translations_by_id(self, anime_id: int):
#         return []
#
#     async def search(self, query: str, limit: int = 10):
#         return []


@pytest.fixture(scope="session")
def event_loop():
    """
    Create an instance of the default event loop for the test session.

    scope="session" означает, что этот event loop создается один раз
    для всей сессии тестирования и переиспользуется во всех тестах.
    Это важно для async тестов, чтобы избежать конфликтов между
    различными event loop'ами.
    """
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    yield loop
    loop.close()

@pytest.fixture(scope="session")
def access_token():
    tokens = create_tokens(Payload(sub=0, name="test"))
    return tokens.access_token

@pytest.fixture
def client():
    client = TestClient(app)
    yield client

# @pytest_asyncio.fixture
# async def async_client():
#     async with AsyncClient(base_url="http://testserver") as ac:
#         yield ac
