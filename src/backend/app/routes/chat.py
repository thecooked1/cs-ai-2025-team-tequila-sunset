from fastapi import APIRouter
from app.models.schemas import ChatRequest
from app.services.ai_service import generate_response

router = APIRouter()

@router.post("/chat")
async def handle_chat_request(request: ChatRequest):
    """
    Handles a chat request by generating a response from the AI service.
    """
    # Convert Pydantic models to a list of dictionaries for the service
    messages_dict = [msg.model_dump() for msg in request.messages]
    
    # Get the AI's response
    ai_content = await generate_response(messages_dict)
    
    # This currently only handles text responses. We will expand it later.
    return {"role": "assistant", "content": ai_content}