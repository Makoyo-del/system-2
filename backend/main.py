# backend/main.py
from fastapi import FastAPI
from routes import router

app = FastAPI(title="Theatre Ticket Management System")

# Include API routes
app.include_router(router, prefix="/api")
