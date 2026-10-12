from datetime import date
from typing import List, Optional
from pydantic import BaseModel, EmailStr

# Pydantic Models
class RegistratoinSchema(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

# The remaining models yet to be trnasfered as per the need