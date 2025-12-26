   # ATLAS: The Context-Aware AI Game Master

**ATLAS** is a next-generation AI Dungeon Master designed for Dungeons & Dragons 5th Edition.

Unlike standard chatbots that hallucinate or forget rules, ATLAS is **context-aware**. It tracks your character's specific stats, enforces inventory limits, manages game state (XP/Leveling), and generates immersive, period-accurate artwork on the fly.

---

## Key Features

### Intelligent Game Mastering
*   **Context Injection System:** The AI reads your character sheet (Stats, Inventory, Class) before every response.
*   **Rule Enforcement:** If you try to use an item you don't have, ATLAS will check your inventory and narratively refuse the action.
*   **Stat-Based Outcomes:** Actions are judged against your specific Ability Scores (e.g., a low-STR character will struggle to lift heavy objects).

### Multi-Modal Immersion
*   **Dynamic Image Generation:** Ask "Show me what this looks like," and ATLAS generates a visualization using DALL-E 3.
*   **Consistent Art Style:** All images are programmaticly prompted to appear as **"Medieval Illuminated Manuscripts"** (ink and watercolor style) to maintain immersion.

### Game State Management
*   **AI Character Creator:** Generates valid D&D 5e stats, backstories, and avatars from a simple text prompt (e.g., "A nervous goblin wizard").
*   **Auto-Loot System:** When you find an item in the story, the AI outputs a hidden tag that automatically adds the item to your UI Inventory.
*   **Consumption Logic:** When you drink a potion or lose an item, the AI removes it from your inventory automatically.
*   **Real-Time Streaming:** Text streams token-by-token for a seamless, fast storytelling experience.

---

## Technical Architecture

ATLAS uses a decoupled client-server architecture:

1.  **Frontend (React + Vite):** Handles the UI, visual state (Character Sheet), and parses the AI's streaming response for control tags (e.g., `[ADD_ITEM]`, `[IMAGE_PROMPT]`).
2.  **Backend (FastAPI + Python):** Orchestrates the AI logic. It maintains session memory, injects the character sheet into the System Prompt using XML tags, and manages the OpenAI API interactions.
3.  **AI Layer:**
    *   **Logic:** OpenAI **GPT-4o** (Temperature 0.7).
    *   **Vision:** OpenAI **DALL-E 3**.
    *   **Token Management:** `tiktoken` used for sliding window truncation to prevent context overflow.

---

## Tech Stack

*   **Frontend:** React 18, Vite, CSS3 (Custom Medieval Theme)
*   **Backend:** Python 3.11+, FastAPI, Uvicorn, Pydantic
*   **AI Services:** OpenAI API
*   **Utilities:** `uuid` (Session Management), `react-markdown` (Text Formatting)

---

## Installation & Setup

Follow these steps to run ATLAS locally.

### 1. Prerequisites
*   Node.js & npm installed.
*   Python 3.11 or higher installed.
*   A valid **OpenAI API Key**.

### 2. Backend Setup

Navigate to the backend directory:

```
cd src/backend
```
  

Create and activate a virtual environment:

# Windows
```
python -m venv venv
venv\Scripts\activate
```

# Mac/Linux
```
python3 -m venv venv
source venv/bin/activate
```

Install Python dependencies:
```
pip install -r requirements.txt
```

Configuration:
Create a file named .env inside src/backend/ and add your API key:

```
OPENAI_API_KEY="sk-your-actual-openai-key-here"
```

Start the Backend Server:

```
uvicorn app.main:app --reload
```

cd src/frontend

3. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```
cd src/frontend
```

Install JavaScript dependencies:

```   
npm install
```

Start the Frontend Client:

```  
npm run dev
```
  

The Frontend is now running at http://localhost:5173
🎮 Usage Guide

    Launch: Open http://localhost:5173 in your browser.

    Create Character: You will see the "Forging a New Hero" screen. Type a concept (e.g., "A heavy metal bard dwarf") and click Begin.

    The Adventure: Once the dashboard loads, you can chat with the AI.

    Visuals: Type commands like "Show me the room" or "Draw this monster" to trigger image generation.

    Inventory: Try commands like "I search the chest" to find items, or "I drink the potion" to remove them.

    New Game: Click the "✨ New Story" button in the top right to wipe the memory and start over.

 Developer Notes

    Dry Run Mode: To save money on API credits during development, you can set IS_DRY_RUN = True in src/backend/app/services/ai_service.py. This will return placeholder images instead of calling DALL-E 3.

    Session Management: Sessions are currently stored in-memory on the backend. Restarting the backend server (uvicorn) will wipe active game memories.

 Team: Tequila Sunset

    Nikoloz Tepnadze - Backend Architecture, AI Logic, Prompt Engineering.

    Davit Datunashvili - UI/UX Design, React Component Structure.

    Ioane Chanturia - Backend Architecture, Game Logic

Built for Kutaisi International University (Building AI Powered Apps) - Spring 2025