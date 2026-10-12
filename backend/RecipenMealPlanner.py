from datetime import date, datetime
from sqlalchemy import Boolean, Column, Date, DateTime, Float, ForeignKey, Integer, String, Table, Text, UniqueConstraint, create_engine, func
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, relationship

Engine = create_engine("sqlite:///RecipenMealPlanner.db", echo=True)

class Base(DeclarativeBase):
    pass

class Users(Base):
    __tablename__ = "Users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50))
    email: Mapped[str] = mapped_column(String(100), unique=True)
    password: Mapped[str] = mapped_column(String(25))

# Remaining tables to be imported as per the need

# creating the database tables
Base.metadata.create_all(Engine)

with Session(Engine) as session:

    read_users = session.query(Users).all()
    for user in read_users:
        print(user)