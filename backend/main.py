from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Routers import endpoints
app = FastAPI()

app.include_router(endpoints.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
