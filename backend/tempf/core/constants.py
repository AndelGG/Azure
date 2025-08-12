from enum import Enum

class APITags(str, Enum):
    """Теги для группировки эндпоинтов в документации"""
    AUTH = "Authentication"
    USERS = "Users"
    MOVIES = "Movies"
    TAGS = "Tags"
    ANIME = "Anime"

class HTTPStatus:
    """HTTP статус коды"""
    OK = 200
    CREATED = 201
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    FORBIDDEN = 403
    NOT_FOUND = 404
    CONFLICT = 409
    INTERNAL_SERVER_ERROR = 500

class Messages:
    """Общие сообщения для API"""
    USER_CREATED = "User created successfully"
    USER_NOT_FOUND = "User not found"
    INVALID_CREDENTIALS = "Invalid credentials"
    TOKEN_EXPIRED = "Token has expired"
    ACCESS_DENIED = "Access denied"
    MOVIE_NOT_FOUND = "Movie not found"
    TAG_NOT_FOUND = "Tag not found"
