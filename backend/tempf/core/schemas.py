from pydantic import BaseModel
from typing import Generic, TypeVar, List, Optional

T = TypeVar('T')

class BaseResponse(BaseModel, Generic[T]):
    """Базовый класс для всех API ответов"""
    success: bool = True
    data: Optional[T] = None
    message: Optional[str] = None

class PaginatedResponse(BaseModel, Generic[T]):
    """Базовый класс для пагинированных ответов"""
    items: List[T]
    total: int
    page: int
    size: int
    pages: int

class ErrorResponse(BaseModel):
    """Схема для ошибок"""
    success: bool = False
    error: str
    details: Optional[str] = None
