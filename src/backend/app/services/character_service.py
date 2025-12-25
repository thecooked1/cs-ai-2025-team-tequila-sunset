import os
import json
from openai import AsyncOpenAI
from dotenv import load_dotenv
from app.models.schemas import Character, CharacterStats, InventoryItem

load_dotenv()
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

CREATOR_SYSTEM_PROMPT = """
You are a D&D 5e Character Generator.
Input: A user's concept (e.g., "A sneaky goblin").
Output: A valid JSON object matching the D&D 5e rules.

RULES:
1. **Stats:** Use the Standard Array (15, 14, 13, 12, 10, 8). Assign them logically based on class.
2. **Inventory:** Give them standard starting equipment for their class (e.g., Wizard gets Spellbook, Rogue gets Thieves' Tools).
3. **Picture Prompt:** In the description, include a visual description suitable for generating an image.
4. **Output Format:** You MUST return ONLY valid JSON.

JSON Structure:
{
  "name": "String",
  "class_name": "String",
  "level": 1,
  "description": "String (Short bio + visual description)",
  "stats": { "STR": int, "DEX": int, "CON": int, "INT": int, "WIS": int, "CHA": int },
  "inventory": [ { "name": "Item Name", "description": "Short desc" } ]
}
"""

async def generate_character_data(user_prompt: str) -> dict:
    try:
        response = await client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": CREATOR_SYSTEM_PROMPT},
                {"role": "user", "content": f"Create a character based on this concept: {user_prompt}"}
            ],
            temperature=0.7,
            response_format={ "type": "json_object" } # <--- MAGIC SWITCH
        )
        
        # Parse the JSON string from OpenAI into a Python Dict
        char_data = json.loads(response.choices[0].message.content)
        return char_data

    except Exception as e:
        print(f"Error generating character: {e}")
        return None