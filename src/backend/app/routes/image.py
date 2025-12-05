from fastapi import APIRouter, HTTPException
from app.models.schemas import ImageRequest
from app.services.ai_service import generate_image

router = APIRouter()

@router.post("/image")
async def handle_image_request(request: ImageRequest):
    """
    Handles an image generation request.
    """
    image_url = await generate_image(request.prompt)
    
    if image_url is None:
        raise HTTPException(status_code=500, detail="Failed to generate image.")
        
    return {"imageUrl": image_url}