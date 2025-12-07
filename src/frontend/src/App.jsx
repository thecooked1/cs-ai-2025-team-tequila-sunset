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

    try {
      const response = await fetch(API_URL_CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // UPDATED PAYLOAD: sending session_id and SINGLE message
        body: JSON.stringify({ 
            session_id: sessionId,
            message: userMessageText 
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