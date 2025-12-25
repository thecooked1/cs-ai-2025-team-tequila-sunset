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
    description: str
    stats: CharacterStats
    inventory: List[InventoryItem]

# --- 1. The New Session-Based Chat Request ---
class ChatRequest(BaseModel):
    session_id: str
    message: str 
    character: Optional[Character] = None # We make this optional so the app doesn't crash if it's missing

# --- 2. The Image Request (Restored) ---
class ImageRequest(BaseModel):
    prompt: str