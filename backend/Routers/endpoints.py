from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, File, Form, Query, UploadFile
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import EmailStr
from RecipenMealPlanner import Engine
from sqlalchemy.orm import Session, sessionmaker
from Curd.services import Login, Register, addMealPlan, createRecipe, deleteMeal, deleteRecipe, favoriteRecipe, getFavorites, generateList, getMeals, getRecipeDetails, getRecipes, getShoppingList, getTags, getUserID, handleDeleteChecked, handleToggle, updateRecipe
# import jwt
from Routers.pydanticModels import LoginSchema, MealPlannerSchema, RecipeCreateSchema, RegistratoinSchema, ShoppingList
import os


# creating the router instance
router = APIRouter(
    prefix = "/api",
    tags = ["user"]
)

SessionLocal = sessionmaker(bind=Engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

security = HTTPBearer()

def get_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    # 
    return getUserID(credentials)


@router.post("/register")
def register(user_data: RegistratoinSchema, db: Session = Depends(get_db) ):
    # 
    return Register(user_data, db)

@router.post("/login")
def login(credentials: LoginSchema, db: Session = Depends(get_db) ):
    # 
    return Login(credentials, db)

@router.post("/recipes")
async def create_recipe(title: str = Form(...),
    description: str = Form(None),  # Optional field
    cuisine: str = Form(...),
    category: str = Form(...),
    prep_time: int = Form(...),
    cook_time: int = Form(...),
    servings: int = Form(...),
    difficulty: str = Form(...),
    tags_id: str = Form(None),
    ingredients: str = Form(...),  # Received as a JSON string from frontend
    instructions: str = Form(...),  # Received as a JSON string from frontend
    image_path: UploadFile = File(None), 
    user_id: int = Depends(get_user_id), db: Session = Depends(get_db)):
    # 
    return await createRecipe(title, description, cuisine, category, prep_time,
    cook_time, servings, difficulty, tags_id, ingredients, instructions, image_path, user_id, db)