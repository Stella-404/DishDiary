from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, File, Form, Query, UploadFile
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import EmailStr
from RecipenMealPlanner import Engine
from sqlalchemy.orm import Session, sessionmaker
from Curd.services import Login, Register, getUserID
# addMealPlan, createRecipe, deleteMeal, deleteRecipe, favoriteRecipe, getFavorites, generateList, getMeals, getRecipeDetails, getRecipes, getShoppingList, getTags, handleDeleteChecked, handleToggle, updateRecipe
# import jwt
from Routers.pydanticModels import LoginSchema, RegistratoinSchema
# MealPlannerSchema, RecipeCreateSchema,  ShoppingList
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
