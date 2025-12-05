from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.chat import router as chat_router
from app.routes.image import router as image_router

app = FastAPI(title="ATLAS API")

# Configure CORS (Cross-Origin Resource Sharing)
# This is crucial for allowing your React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, change this to your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the chat router
app.include_router(chat_router, prefix="/api")
app.include_router(image_router, prefix="/api")

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the ATLAS API. Let the adventure begin!"}

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}