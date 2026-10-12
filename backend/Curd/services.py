from collections import defaultdict
from datetime import datetime, timedelta
import json
import os
from fastapi import HTTPException, security
from RecipenMealPlanner import Users
# Favorite, Ingredient, Instruction, Recipe, ShoppingListItem, Tag, Users, MealPlan
import jwt

security = security.HTTPBearer()
JWT_SECRET = "SECRET_KEY"
JWT_ALGORITHM = "HS256"

def getUserID(credentials):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, JWT_ALGORITHM)
        user_id = payload.get("id")
        if user_id is None:
            raise HTTPException(status_code=403, detail="Invalid token payload")
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized. Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def Register(user_data, db):
    existing_user = db.query(Users).filter(Users.email == user_data.email).first()
    if existing_user:
        # giving a BAD REQUEST error code
        raise HTTPException(status_code=400, detail="Email is already registered!")

    new_user = Users(
        username = user_data.username,
        email = user_data.email,
        password = user_data.password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {
        "message": "You have been successfully registered"
    }

def Login(login_data, db):
    user = db.query(Users).filter(Users.email == login_data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Icorrect Email or Password. Try Again")

    if user.password != login_data.password:
        raise HTTPException(status_code=404, detail="Icorrect Email or Password. Try Again")

    token_expiration= datetime.now() + timedelta(hours=1)

    jwt_claims = {
        "username": user.username,
        "id": user.id,
        "exp": token_expiration
    }
    # generating the token
    token = jwt.encode(jwt_claims, JWT_SECRET, JWT_ALGORITHM)

    return {
        "message": "Login Successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "name": user.username,
            "id": user.id
        }
    }