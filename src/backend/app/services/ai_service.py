import os
import tiktoken
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# NEW IMMERSIVE SYSTEM PROMPT
ATLAS_SYSTEM_PROMPT = """
You are the First Narrator, a weaver of worlds and a teller of tales. You do not act like a typical AI assistant; 
you are a creative partner, a storyteller. Your user is a fellow Dungeon Master, and you are building a new world together, live, in this conversation.

Your tone is evocative, mysterious, and engaging. You speak in descriptive prose, not lists. 
You should never break character or refer to yourself as an AI.

When the user gives you an initial idea, do not give them options. 
Instead, take their idea and immediately begin narrating the opening scene of this new world. 
Weave their concept into a living, breathing introduction. Set the scene, establish the mood, and end with an open-ended question that invites the user to add the next detail.

For example, if the user says "a post-apocalyptic world with magic," you should not list ideas. You should BEGIN the story like this:

"The air itself hums a fractured tune, a remnant of the day the sky shattered. We find ourselves in the ruins of the Old World, where 
twisted metal spires claw at a bruised twilight sky and rivers of raw magic flow through cracked pavement.
A lone figure walks these desolate streets... what do they see first that reminds them of the world that was?"

Always continue the story based on the user's input, treating it as the next chapter in your collaborative tale.

Your rules:
- Always be helpful and creative.
- Never provide game mechanics, stats, or specific rules from systems like D&D. Focus purely on the narrative.
"""


TOKEN_LIMIT = 4096

def count_tokens(messages: list[dict], model: str = "gpt-4o") -> int:
    """Helper function to count tokens in a list of messages."""
    try:
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        encoding = tiktoken.get_encoding("cl100k_base")
    
    num_tokens = 0
    for message in messages:
        # Every message adds 3 tokens for metadata (role, name, etc.)
        num_tokens += 3 
        for key, value in message.items():
            num_tokens += len(encoding.encode(value))
    num_tokens += 3  # Every reply is primed with <|im_start|>assistant
    return num_tokens

async def generate_streamed_response(messages: list[dict]):
    """
    Yields chunks of text from the OpenAI API stream, truncating old messages if needed.
    """
    system_message = {"role": "system", "content": ATLAS_SYSTEM_PROMPT}
    
    # --- START OF NEW TRUNCATION LOGIC ---
    
    # Create a copy of the messages to avoid modifying the original list
    messages_to_send = messages.copy()
    
    # Continuously check token count and remove oldest messages until it fits
    while count_tokens([system_message] + messages_to_send) > TOKEN_LIMIT:
        # Remove the oldest message (the first one in the list)
        messages_to_send.pop(0) 
        print("Truncating conversation history...") # Optional: for debugging

    # --- END OF NEW TRUNCATION LOGIC ---
    
    try:
        stream = await client.chat.completions.create(
            model="gpt-4o",
            # MODIFIED: Send the potentially truncated list of messages
            messages=[system_message] + messages_to_send,
            temperature=0.9,
            max_tokens=1024,
            stream=True,
        )
        
        async for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                yield chunk.choices[0].delta.content

    except Exception as e:
        print(f"An error occurred during streaming: {e}")
        yield "The threads of fate are tangled at the moment... Please try again."