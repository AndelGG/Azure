from fastapi import APIRouter

from src.deps.auth_init import AuthServiceDep
from src.exceptions.service_error import NotFoundError, VerificationError
from src.schemas.users import UserCreate

from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from src.service.auth import AuthService

# Создаем роутер для аутентификации
router = APIRouter(prefix="/auth", tags=["auth"])
bearer = HTTPBearer()

@router.post("/register")
async def register(
    user: UserCreate,
    auth: AuthService = AuthServiceDep
):
    try:
        return await auth.register(user)
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Registration failed"
        )


@router.post("/login")
async def login(
    user: UserCreate,
    auth: AuthService = AuthServiceDep
):
    try:
        return await auth.login(user)
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Login failed"
        )

@router.post("/login/access-token")
async def get_new_tokens(
    auth: AuthService = AuthServiceDep,
    cred: HTTPAuthorizationCredentials = Depends(bearer),
):
    try:
        token = cred.credentials
        return await auth.get_new_tokens(token)
    except VerificationError as e:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=str(e)
        )
    except NotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

# @router.get("/me", response_model=UserResponse)
# async def get_current_user_info(
#     current_user = Depends(get_current_user)
# ):
#     """Получение информации о текущем пользователе"""
#     return UserResponse(
#         id=str(current_user.id),
#         email=current_user.email,
#         is_admin=current_user.is_admin
#     )

