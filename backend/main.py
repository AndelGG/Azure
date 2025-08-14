import uvicorn
from fastapi import FastAPI
from api.endpoints.auth import router as auth_router
from api.endpoints.anime import router as anime_router
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

app = FastAPI(root_path="/api")

app.include_router(auth_router)
app.include_router(anime_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    # uvicorn.run("main:app", reload=False, log_level="info", use_colors=True, host="25.32.2.191", port=8000)
    uvicorn.run("main:app", reload=False, log_level="info", use_colors=True, host="localhost", port=8000)