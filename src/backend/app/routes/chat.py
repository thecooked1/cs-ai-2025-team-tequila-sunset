from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.models.schemas import ChatRequest
from app.services.ai_service import generate_streamed_response 
from app.services import session_service 

router = APIRouter()

@router.post("/chat")
async def handle_chat_request(request: ChatRequest):
    # 1. Extract data from the new request format
    session_id = request.session_id
    user_input = request.message

    # 2. Get current history from our new Session Service
    # (This works because we are now storing state in the backend!)
    history = session_service.get_history(session_id)

    # 3. Add the User's new message to that history
    user_msg_dict = {"role": "user", "content": user_input}
    session_service.update_history(session_id, user_msg_dict)
    
    # 4. Prepare the full context (History + New Message) to send to OpenAI
    full_context = session_service.get_history(session_id)

    # 5. Define the streaming wrapper
    async def stream_and_save():
        full_ai_response = ""
        # Stream chunks to the client
        async for chunk in generate_streamed_response(full_context):
            full_ai_response += chunk
            yield chunk
        
        # 6. Once stream finishes, save the AI's reply to backend history
        ai_msg_dict = {"role": "assistant", "content": full_ai_response}
        session_service.update_history(session_id, ai_msg_dict)

    return StreamingResponse(
        stream_and_save(), 
        media_type="text/event-stream"
    )