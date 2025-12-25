import os
import tiktoken
from openai import AsyncOpenAI
from dotenv import load_dotenv
from app.models.schemas import Character

load_dotenv()
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# NEW IMMERSIVE SYSTEM PROMPT
ATLAS_SYSTEM_PROMPT = """
You are the Dungeon Master (DM), a weaver of worlds and the arbiter of rules for a Dungeons & Dragons 5th Edition (5e) campaign. You are building a new world and story together with the player, live in this conversation.

Your tone is evocative, mysterious, and engaging. You speak in descriptive prose, not lists. 
You should never break character or refer to yourself as an AI.

### GAME MASTER RULES (D&D 5e) ###
You have access to the player's CURRENT CHARACTER SHEET below. You must arbitrate actions based on these stats.

1. **INVENTORY & SPELL CHECK (STRICT):** 
   - **Exclusive List:** The inventory list below is EXHAUSTIVE. If an item is not listed, the character DOES NOT have it.
   - **Refusal:** If the player tries to use an item they don't have (e.g., "I drink a potion" but inventory is empty), you MUST refuse the action narratively: "You reach for a potion, but find your belt pouch empty."
   - **No Hallucinations:** Do not assume standard starting gear. Only use what is in the tags.

2. **ABILITY CHECKS & SAVES:**
   - **Calculate Modifiers:** When the player attempts an action, calculate their ability modifier from the raw stats in the <character_sheet> (Modifier = (Score - 10) / 2, rounded down).
     - Example: STR 18 is a +4 modifier. STR 8 is a -1 modifier.
   - **Set the DC:** Mentally assign a Difficulty Class (DC) to the task: Easy (10), Medium (15), Hard (20), Very Hard (25).
   - **Resolution:** 
     - If the action is trivial, narrate success.
     - If the action is risky, compare their Stat/Modifier to the DC. You can ask the player to "Roll for [Skill]" OR narrate the outcome based on their capability.
     - **Failure:** If their stat is too low for the task (e.g., STR 8 trying to lift a heavy gate), narrate the struggle and failure.

### DATA SOURCE INSTRUCTIONS (CRITICAL) ###
I have provided the player's current data below wrapped in <character_sheet> tags.
1. **TRUTH:** The data inside <character_sheet> is the ONLY truth. Do not invent stats.
2. **QUERY:** If the user asks "What are my stats?" or "What do I have?", you must READ DIRECTLY from the <character_sheet> tags. Do not make up numbers. If you don't have access to character sheet information, write " I don't have access to character sheet", Don't invent stats.

### NARRATIVE FLOW ###
When the user gives you an initial idea, do not give them options. 
Instead, take their idea and immediately begin narrating the opening scene. 
Weave their concept into a living, breathing introduction. Set the scene, establish the mood, and end with an open-ended question or a call for initiative if danger is imminent.

For example, if the user says "a post-apocalyptic world with magic," BEGIN the story like this:
"The air itself hums a fractured tune, a remnant of the day the sky shattered. We find ourselves in the ruins of the Old World, where twisted metal spires claw at a bruised twilight sky and rivers of raw magic flow through cracked pavement. A lone figure walks these desolate streets... what do they see first that reminds them of the world that was?"

Always continue the story based on the user's input, treating it as the next chapter in your collaborative tale.

### VISUAL RULES ###
- Always be helpful and creative.
- IMPORTANT: When the user asks you to "show," "draw," or "visualize" something, you must first write a rich, detailed, one-paragraph visual description. Then, on a new line, you MUST write the exact tag: [IMAGE_PROMPT].
- CRITICAL ART STYLE INSTRUCTION: When writing the description for the image, ALWAYS end the description with these exact style keywords: "Style of a medieval illuminated manuscript, ink and watercolor illustration on aged parchment paper, intricate borders, hand-drawn aesthetic, historical fantasy art."
- For example: "A sketch of a fearsome dragon coiled around a stone tower. The dragon's scales are drawn in fine ink detail with washes of red and gold watercolor. The tower looks ancient and crumbling. Style of a medieval illuminated manuscript, ink and watercolor on aged parchment paper.
[IMAGE_PROMPT]"
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

async def generate_streamed_response(messages: list[dict], character: Character = None):
    """
    Yields chunks of text from the OpenAI API stream, truncating old messages if needed.
    """

    # --- DEBUGGING LOGS (Add these lines) ---
    print("\n----- DEBUG: AI CONTEXT CHECK -----")
    if character:
        print(f"Character Detected: {character.name}")
        items = [item.name for item in character.inventory]
        print(f"Inventory Passed to AI: {items}")
        print(f"Stats Passed to AI: {character.stats}")
    else:
        print("!! NO CHARACTER DATA RECEIVED !!")
    print("-----------------------------------\n")
    # ----------------------------------------

    # 1. Start with the base prompt
    system_content = ATLAS_SYSTEM_PROMPT
    
    
    # 2. Inject Character Data (Context Injection)
    if character:
        inventory_list = ", ".join([item.name for item in character.inventory])
    char_block = f"""
\n### CURRENT PLAYER CHARACTER SHEET ###
<character_sheet>
    <name>{character.name}</name>
    <description>{character.description}</description>
    <stats>
        STR: {character.stats.STR}
        DEX: {character.stats.DEX}
        CON: {character.stats.CON}
        INT: {character.stats.INT}
        WIS: {character.stats.WIS}
        CHA: {character.stats.CHA}
    </stats>
    <inventory>
        {inventory_list}
    </inventory>
</character_sheet>
######################################
"""
    system_content += char_block

    print(f"\n--- SYSTEM PROMPT (Tail End) ---\n{char_block if character else 'No Character Data'}\n--------------------------------\n")

    system_message = {"role": "system", "content":system_content}
    
    # --- START OF NEW TRUNCATION LOGIC ---
    
    # Create a copy of the messages to avoid modifying the original list
    messages_to_send = messages.copy()
    
    # Continuously check token count and remove oldest messages until it fits
    while count_tokens([system_message] + messages_to_send) > TOKEN_LIMIT:
        # Remove the oldest message (the first one in the list)
        messages_to_send.pop(0) 
        print("Truncating conversation history...") # Optional: for debugging

    print("\n========== X-RAY: WHAT OPENAI ACTUALLY SEES ==========")
    print("--- SYSTEM PROMPT (Is the Sheet here?) ---")
    print(system_message['content']) 
    print("\n--- CONVERSATION HISTORY (What context is sent?) ---")
    for msg in messages_to_send:
        print(f"[{msg['role']}]: {msg['content']}")
    print("======================================================\n")
    # --------------------------------------------------------

    # --- END OF NEW TRUNCATION LOGIC ---
    
    try:
        stream = await client.chat.completions.create(
            model="gpt-4o",
            # MODIFIED: Send the potentially truncated list of messages
            messages=[system_message] + messages_to_send,
            temperature=0.7,
            max_tokens=1024,
            stream=True,
        )
        
        async for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                yield chunk.choices[0].delta.content

    except Exception as e:
        print(f"An error occurred during streaming: {e}")
        yield "The threads of fate are tangled at the moment... Please try again."



# !!! IMPORTANT BUDGET CONTROL !!!
# Set this to False to spend money and make real images.
# Set this to True to test the logic without spending money.
IS_DRY_RUN = True

async def generate_image(prompt: str) -> str:
    """
    Generates an image using DALL-E 3 based on a prompt.
    Includes a "dry run" mode to avoid costs during development.
    """
    if IS_DRY_RUN:
        print("--- IMAGE GENERATION DRY RUN ---")
        print(f"Prompt: {prompt}")
        # Return a placeholder image URL for testing
        return "https://i.imgur.com/8pS19sD.jpeg" # A placeholder fantasy image

    print("--- IMAGE GENERATION LIVE RUN (COSTING $0.04) ---")
    try:
        response = await client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            n=1,
            size="1024x1024",
            quality="standard",
        )
        return response.data[0].url
    except Exception as e:
        print(f"An error occurred during image generation: {e}")
        return None # Return None on failure        