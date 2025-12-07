from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str
    content: str

# --- 1. The New Session-Based Chat Request ---
class ChatRequest(BaseModel):
    session_id: str
    message: str 

# --- 2. The Image Request (Restored) ---
class ImageRequest(BaseModel):
    prompt: str