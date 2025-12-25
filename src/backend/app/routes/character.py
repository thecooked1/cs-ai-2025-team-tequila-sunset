from fastapi import APIRouter, HTTPException
from app.models.schemas import CreateCharacterRequest, Character
from app.services.character_service import generate_character_data
from app.services.ai_service import generate_image # Reuse your existing image logic!

router = APIRouter()

@router.post("/create-character")
async def create_character(request: CreateCharacterRequest):
    # 1. Generate the Stats/JSON
    char_data = await generate_character_data(request.user_prompt)
    
    if not char_data:
        raise HTTPException(status_code=500, detail="Failed to generate character data")

    # 2. Generate the Avatar
    # We create a prompt based on the name and description the AI just invented
    image_prompt = f"A D&D character portrait of {char_data['name']}, {char_data['description']}. Style of a medieval illuminated manuscript, ink and watercolor."
    
    image_url = await generate_image(image_prompt)
    
    # 3. Combine them
    char_data['picture_url'] = image_url
    
    return char_data