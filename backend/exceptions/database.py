class BaseCustomException(Exception):
    """Базовое кастомное исключение"""
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)

class NotFoundError(BaseCustomException):
    """Ошибка когда ресурс не найден"""
    pass

class UserAlreadyExistsError(BaseCustomException):
    """Ошибка когда пользователь уже существует"""
    pass

class ValidationError(BaseCustomException):
    """Ошибка валидации данных"""
    pass