import os
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

async def generate_response(messages: list[dict]) -> str:
    """
    Generates a response from the OpenAI API based on the conversation history.
    """
    system_message = {"role": "system", "content": ATLAS_SYSTEM_PROMPT}
    
    try:
        # Check if this is the very first user message in a new conversation
        # If so, we can use a slightly more direct internal prompt to kick things off.
        # For simplicity now, we'll use the same logic for all turns.
        
        response = await client.chat.completions.create(
            model="gpt-4o",
            messages=[system_message] + messages,
            temperature=0.9, # Increased temperature for more creativity
            max_tokens=1024,
        )
        return response.choices[0].message.content

    except Exception as e:
        print(f"An error occurred: {e}")
        return "The threads of fate are tangled at the moment... Please try again."