from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DB_ADDRESS: str
    DB_USER: str
    DB_PASSWORD: str
    KODIK_API_KEY: str
    DB_NAME: str

    model_config = SettingsConfigDict(env_file=['.env', '../.env'], env_file_encoding='utf-8')

    @property
    def DB_URL(self):
        return f"mysql+aiomysql://{self.DB_USER}{f":{self.DB_PASSWORD}" if self.DB_PASSWORD != "" else ""}@{self.DB_ADDRESS}/{self.DB_NAME}"


settings = Settings()