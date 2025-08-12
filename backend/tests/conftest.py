import sys
from pathlib import Path

# Add project root to Python path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

import pytest
import pytest_asyncio
import asyncio
from httpx import AsyncClient
from fastapi.testclient import TestClient
from unittest.mock import Mock
from src.main import app
from src.deps.dependencies import UOWDep
from src.unitofwork import IUnitOfWork


class MockUnitOfWork:
    """Mock Unit of Work for testing"""
    def __init__(self):
        self.movies = Mock()
        self.auth = Mock()
        self.movie_api = Mock()  # Добавляем movie_api для anime тестов
        self.committed = False
        self.rolled_back = False

    async def __aenter__(self):
        return self

    async def __aexit__(self, *args):
        pass

    async def commit(self):
        self.committed = True

    async def rollback(self):
        self.rolled_back = True


@pytest.fixture
def mock_uow():
    """Provides a mock Unit of Work"""
    return MockUnitOfWork()


@pytest.fixture
def client(mock_uow):
    """Provides a test client for the FastAPI app with UOW dependency override"""
    def _get_mock_uow():
        return mock_uow

    app.dependency_overrides[UOWDep] = _get_mock_uow
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


@pytest.fixture
def override_uow_dependency(mock_uow):
    """Provides access to the mocked UOW for assertions"""
    return mock_uow


@pytest_asyncio.fixture
async def async_client():
    """Provides an async test client for the FastAPI app"""
    async with AsyncClient(base_url="http://test") as ac:
        ac.app = app
        yield ac


@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()
