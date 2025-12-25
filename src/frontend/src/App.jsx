import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import './App.css';
import WorldBook from './components/WorldBook';
import PromptCorner from './components/PromptCorner';
import CharacterSheet from './components/CharacterSheet';
import DiceTray from './components/DiceTray';
import CharacterModal from './components/CharacterModal';

const API_URL_CHAT = "http://localhost:8000/api/chat";
const API_URL_IMAGE = "http://localhost:8000/api/image";

function App() {
  const [bookContent, setBookContent] = useState([
    { role: 'assistant', content: 'Welcome to ATLAS. I am the First Narrator. What world shall we build today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // NEW: State for Session ID
  const [sessionId, setSessionId] = useState(null);

  // Initialize Session ID on first load
  useEffect(() => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    console.log("Session ID initialized:", newSessionId);
  }, []);

  // Placeholder Data
  const [character, setCharacter] = useState({
    name: "Lyra Swiftwind",
    description: "A nimble rogue...",
    stats: { STR: 10, DEX: 18, CON: 12, INT: 14, WIS: 16, CHA: 14 },
    inventory: [{ name: "Dagger", description: "Sharp." }]
  });

  // --- HELPER: Generate Image ---
  const generateImage = async (prompt) => {
    // ... (Same as before)
    try {
        const response = await fetch(API_URL_IMAGE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        
        setBookContent(currentContent => {
          const newContent = [...currentContent];
          const lastMsg = newContent[newContent.length - 1];
          lastMsg.content = lastMsg.content.replace('[IMAGE_PROMPT]', '').trim();
          lastMsg.imageUrl = data.imageUrl;
          return newContent;
        });
      } catch (error) {
        console.error("Error generating image:", error);
      }
  };

  // --- CORE HELPER: Stream API Response ---
  const streamResponse = async (userMessageText) => {
    setIsLoading(true);
    
    setBookContent(prev => [...prev, { role: 'assistant', content: '' }]);

        // --- DEBUG CHECK ---
    console.log("SENDING TO BACKEND:", { 
        session_id: sessionId,
        message: userMessageText,
        character: character // <--- Is this populated?
    });

    try {
      const response = await fetch(API_URL_CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // UPDATED PAYLOAD: sending session_id and SINGLE message
        body: JSON.stringify({ 
            session_id: sessionId,
            message: userMessageText,
            character: character
        }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullResponse = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;

        setBookContent(currentContent => {
          const newContent = [...currentContent];
          const lastMsg = newContent[newContent.length - 1];
          lastMsg.content = fullResponse;
          return newContent;
        });
      }

      if (fullResponse.includes('[IMAGE_PROMPT]')) {
        setBookContent(currentContent => {
            const newContent = [...currentContent];
            const lastMsg = newContent[newContent.length - 1];
            lastMsg.content = lastMsg.content.replace('[IMAGE_PROMPT]', '\n\n*Summoning image...*');
            return newContent;
        });
        const imagePrompt = fullResponse.split('[IMAGE_PROMPT]')[0].trim();
        await generateImage(imagePrompt);
      }

// --- NEW: ITEM LOGIC (Fixed) ---
      // Regex to find all occurrences of [ADD_ITEM: {json}]
      const itemRegex = /\[ADD_ITEM:\s*({.*?})\]/g;
      let match;
      
      while ((match = itemRegex.exec(fullResponse)) !== null) {
        // CRITICAL FIX: Capture the strings NOW before the loop continues
        const tagToReplace = match[0]; // The full "[ADD_ITEM...]" string
        const jsonString = match[1];   // The "{...}" string inside

        try {
          const newItem = JSON.parse(jsonString);

          // 1. Clean the tag out of the visible chat text
          setBookContent(currentContent => {
            const newContent = [...currentContent];
            const lastMsg = newContent[newContent.length - 1];
            
            // Use the CAPTURED variable 'tagToReplace', not 'match[0]'
            if (lastMsg.content.includes(tagToReplace)) {
                lastMsg.content = lastMsg.content.replace(tagToReplace, '').trim();
                lastMsg.content += `\n\n*Item Acquired: ${newItem.name}*`;
            }
            return newContent;
          });

          // 2. Update the Character State
          setCharacter(prevChar => {
            // Check if we already added this item to avoid duplicates in strict React mode
            const exists = prevChar.inventory.some(i => i.name === newItem.name);
            if (exists) return prevChar;

            return {
                ...prevChar,
                inventory: [...prevChar.inventory, newItem]
            };
          });

          console.log("Added item to inventory:", newItem);

        } catch (e) {
          console.error("Failed to parse item JSON:", e);
        }
      }

      // --- NEW: REMOVE ITEM LOGIC ---
      // Regex to capture [REMOVE_ITEM: "Item Name"]
      const removeRegex = /\[REMOVE_ITEM:\s*"(.*?)"\]/g;
      let removeMatch;

      while ((removeMatch = removeRegex.exec(fullResponse)) !== null) {
        // Capture variables immediately to prevent async bugs
        const tagToReplace = removeMatch[0]; // e.g. [REMOVE_ITEM: "Dagger"]
        const itemNameToRemove = removeMatch[1]; // e.g. Dagger

        try {
          // 1. Clean the tag out of the visible chat text
          setBookContent(currentContent => {
            const newContent = [...currentContent];
            const lastMsg = newContent[newContent.length - 1];
            
            if (lastMsg.content.includes(tagToReplace)) {
                lastMsg.content = lastMsg.content.replace(tagToReplace, '').trim();
                // Add a visual cue
                lastMsg.content += `\n\n*Item Removed: ${itemNameToRemove}*`;
            }
            return newContent;
          });

          // 2. Update the Character State (Filter it out)
          setCharacter(prevChar => {
            return {
                ...prevChar,
                // Keep only items that DO NOT match the name
                inventory: prevChar.inventory.filter(item => item.name !== itemNameToRemove)
            };
          });

          console.log("Removed item from inventory:", itemNameToRemove);

        } catch (e) {
          console.error("Failed to process item removal:", e);
        }
      }

    } catch (error) {
      console.error("Error:", error);
      setBookContent(prev => {
        const newContent = [...prev];
        const lastMsg = newContent[newContent.length - 1];
        lastMsg.content += "\n\n[Connection lost.]";
        return newContent;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- HANDLER: User Submit ---
  const handlePromptSubmit = async (prompt) => {
    if (!prompt.trim() || isLoading) return;
    const userEntry = { role: 'user', content: prompt };
    
    // Update UI immediately
    setBookContent(prev => [...prev, userEntry]);
    
    // Call API with JUST the text
    await streamResponse(prompt);
  };

  // --- HANDLER: Regenerate ---
  const handleRegenerate = async () => {
    if (isLoading || bookContent.length === 0) return;

    // This is trickier with backend state.
    // Ideally, we'd have a backend endpoint to "rollback" history.
    // For now, we will simulate it by just re-sending the last user message?
    // Actually, let's DISABLE regenerate for this specific architectural step 
    // to keep it simple, or implement a backend rollback later.
    alert("Regenerate is temporarily disabled while we upgrade the memory system!");
  };

  return (
    <div className="dm-dashboard">
      <WorldBook 
        content={bookContent} 
        onRegenerate={handleRegenerate} 
        isLoading={isLoading}           
      />
      <PromptCorner onSubmit={handlePromptSubmit} isLoading={isLoading} />
      <CharacterSheet character={character} onOpenModal={() => setIsModalOpen(true)} />
      <DiceTray />
      {isModalOpen && <CharacterModal character={character} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;