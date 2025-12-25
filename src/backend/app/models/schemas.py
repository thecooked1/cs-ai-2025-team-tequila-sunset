from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str
    content: str

class CharacterStats(BaseModel):
    STR: int
    DEX: int
    CON: int
    INT: int
    WIS: int
    CHA: int

class InventoryItem(BaseModel):
    name: str
    description: str = ""

class Character(BaseModel):
    name: str
    class_name: str  # <--- NEW
    level: int = 1   # <--- NEW (Default to 1)
    description: str
    stats: CharacterStats
    inventory: List[InventoryItem]
    # We will add picture_url on the frontend side or backend response wrapper, 
    # but the core character logic usually just needs data. 
    # Let's add it here to be safe.
    picture_url: Optional[str] = None 

# --- 1. The New Session-Based Chat Request ---
class ChatRequest(BaseModel):
    session_id: str
    message: str 
    character: Optional[Character] = None # We make this optional so the app doesn't crash if it's missing

# --- 2. The Image Request (Restored) ---
class ImageRequest(BaseModel):
    prompt: str

class CreateCharacterRequest(BaseModel):
    user_prompt: str # e.g. "A strong orc barbarian"