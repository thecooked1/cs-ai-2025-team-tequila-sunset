import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import './App.css';
import WorldBook from './components/WorldBook';
import PromptCorner from './components/PromptCorner';
import CharacterSheet from './components/CharacterSheet';
import DiceTray from './components/DiceTray';
import CharacterModal from './components/CharacterModal';
import CharacterCreator from './components/CharacterCreator';

const API_URL_CHAT = "http://localhost:8000/api/chat";
const API_URL_IMAGE = "http://localhost:8000/api/image";

function App() {
  const [character, setCharacter] = useState(null); 
  const [bookContent, setBookContent] = useState([
    { role: 'assistant', content: 'Welcome to ATLAS. I am the First Narrator. What world shall we build today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  
  // NEW: State for Session ID
  const [sessionId, setSessionId] = useState(null);

  // Initialize Session ID on first load
  useEffect(() => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    console.log("Session ID initialized:", newSessionId);
  }, []);

  const handleCharacterCreated = (newCharData) => {
    console.log("CHARACTER DATA RECEIVED:", newCharData);
    setCharacter(newCharData);
    
    // Set the initial welcome message dynamically
    setBookContent([
      { 
        role: 'assistant', 
        content: `**Welcome, ${newCharData.name}.**\n\n${newCharData.description}\n\nThe world awaits. What do you do?` 
      }
    ]);
  };  

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

      let hasLeveledUp = false; 

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

      // --- NEW: LEVEL UP LOGIC ---
      if (fullResponse.includes('[LEVEL_UP]') && !hasLeveledUp) {

        hasLeveledUp = true;
        
        setBookContent(currentContent => {
            const newContent = [...currentContent];
            const lastMsg = newContent[newContent.length - 1];
            // Remove tag and add visual text
            if (lastMsg.content.includes('[LEVEL_UP]')) {
                lastMsg.content = lastMsg.content.replace('[LEVEL_UP]', '').trim();
                lastMsg.content += `\n\n**✨ LEVEL UP! You feel your power grow. ✨**`;
            }
            return newContent;
        });

        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 4000); // Hide after 4 seconds

        // Update the character state
        setCharacter(prev => ({
            ...prev,
            level: (prev.level || 1) + 1
        }));
        
        // Optional: You could trigger a confetti effect here!
        console.log("Level Up Triggered!");
      }

      // --- NEW: STAT UPDATE LOGIC ---
      // Regex: [UPDATE_STATS: {"STR": 18, "HP": 20}]
      const statsRegex = /\[UPDATE_STATS:\s*({.*?})\]/g;
      let statMatch;

      while ((statMatch = statsRegex.exec(fullResponse)) !== null) {
        const tagToReplace = statMatch[0];
        const jsonString = statMatch[1];

        try {
          const statsToUpdate = JSON.parse(jsonString);

          // 1. Clean UI
          setBookContent(currentContent => {
            const newContent = [...currentContent];
            const lastMsg = newContent[newContent.length - 1];
            if (lastMsg.content.includes(tagToReplace)) {
                lastMsg.content = lastMsg.content.replace(tagToReplace, '').trim();

                // Create a readable string like "STR increased to 16"
                const changes = Object.entries(statsToUpdate)
                    .map(([key, val]) => `**${key}** increased to **${val}**`)
                    .join(", ");
                
                lastMsg.content += `\n\n📈 *Stat Update: ${changes}*`;

            }
            return newContent;
          });

          // 2. Update Character Sheet
          setCharacter(prev => {
            // We need to handle stats (STR, DEX) inside the 'stats' object,
            // and top-level props like 'HP' or 'AC' (if you have them) separately.
            const newStats = { ...prev.stats };
            const newTopLevel = { ...prev };

            for (const [key, value] of Object.entries(statsToUpdate)) {
                // If it's one of the 6 main stats
                if (["STR","DEX","CON","INT","WIS","CHA"].includes(key)) {
                    newStats[key] = value;
                } else {
                    // Otherwise assume it's a top level prop (like HP if you add it later)
                    newTopLevel[key] = value;
                }
            }

            return {
                ...newTopLevel,
                stats: newStats
            };
          });

        } catch (e) {
          console.error("Failed to update stats:", e);
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

  // --- RENDER ---
  
  // 1. If no character, show Creator
  if (!character) {
    return <CharacterCreator onCreate={handleCharacterCreated} />;
  }


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
      {showLevelUp && (
        <div className="levelup-overlay">
          <div className="levelup-text">LEVEL UP!</div>
        </div>
      )}
    </div>
  );
}

export default App;