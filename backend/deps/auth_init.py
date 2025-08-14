from core.logger import setup_logger
from db.repositories.users import UserRepository
from deps.dependencies import DatabaseDep
from exceptions.service_error import VerificationError
from service.auth import AuthService
from service.users import UserService

from fastapi import Depends, status, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

bearer = HTTPBearer()

async def get_user_service(db: DatabaseDep):
    logger = setup_logger("user_service")
    repo = UserRepository(db)
    return UserService(repo, logger)

async def get_auth_service(db: DatabaseDep):
    auth_logger = setup_logger("auth_service")
    user_logger = setup_logger("user_service")
    repo = UserRepository(db)
    users = UserService(repo, user_logger)
    return AuthService(users, auth_logger)

UserServiceDep = Depends(get_user_service)
AuthServiceDep = Depends(get_auth_service)

def verify_user(cred: HTTPAuthorizationCredentials = Depends(bearer), auth: AuthService = AuthServiceDep):
    try:
        if cred is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authorization header missing"
            )

        token = cred.credentials
        auth.validate_token(token)
    except VerificationError as e:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

