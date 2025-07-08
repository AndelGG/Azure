import uvicorn
from fastapi import FastAPI
from src.auth.router import auth_router
from src.movies.router import router as movies_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(movies_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, log_level="info", use_colors=True, host="25.32.2.191", port=8000)