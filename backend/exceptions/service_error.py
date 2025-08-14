class BaseDomainException(Exception):
    """Базовое доменное исключение"""
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)

class ServiceError(BaseDomainException):
    """Исключение для ошибок сервиса"""
    pass

# Пользовательские исключения
class NotFoundError(BaseDomainException):
    pass

class AlreadyExistsError(BaseDomainException):
    pass

class IncorrectPasswordError(BaseDomainException):
    pass

class DatabaseError(BaseDomainException):
    pass
    # """Общая ошибка базы данных"""
    # def __init__(self, message: str = "Database error occurred"):
    #     super().__init__(message)

class ValidationError(BaseDomainException):
    pass

class TokenTypeError(BaseDomainException):
    pass

class VerificationError(BaseDomainException):
    pass

class RefreshTokenError(BaseDomainException):
    pass