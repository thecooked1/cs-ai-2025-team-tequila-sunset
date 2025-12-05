from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.models.schemas import ChatRequest
from app.services.ai_service import generate_streamed_response 

router = APIRouter()

@router.post("/chat")
async def handle_chat_request(request: ChatRequest):
    """
    Handles a chat request by streaming the response from the AI service.
    """
    messages_dict = [msg.model_dump() for msg in request.messages]
    
    return StreamingResponse(
        generate_streamed_response(messages_dict), 
        media_type="text/event-stream"
    )
