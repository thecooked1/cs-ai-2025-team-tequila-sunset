import { useState, useRef, useEffect } from 'react';
import './App.css';
import WorldBook from './components/WorldBook';
import PromptCorner from './components/PromptCorner';
import CharacterSheet from './components/CharacterSheet';
import DiceTray from './components/DiceTray';
import CharacterModal from './components/CharacterModal';

// API Configuration
const API_URL_CHAT = "http://localhost:8000/api/chat";
const API_URL_IMAGE = "http://localhost:8000/api/image";

function App() {
  // State for the conversation history
  const [bookContent, setBookContent] = useState([
    { role: 'assistant', content: 'Welcome to ATLAS. I am the First Narrator. What world shall we build today?' }
  ]);
  
  // State for UI (Loading, Modal, etc)
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Placeholder Character Data (You can connect this to AI later!)
  const [character, setCharacter] = useState({
    name: "Lyra Swiftwind",
    description: "A nimble rogue with a quick wit...",
    stats: { STR: 10, DEX: 18, CON: 12, INT: 14, WIS: 16, CHA: 14 },
    inventory: [
      { name: "Dagger", description: "Sharp and reliable." },
      { name: "Rope", description: "50ft of silk rope." }
    ]
  });

  // --- HELPER: Generate Image ---
  const generateImage = async (prompt) => {
    try {
      const response = await fetch(API_URL_IMAGE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      
      // Update the last message to include the image URL
      setBookContent(currentContent => {
        const newContent = [...currentContent];
        const lastMsg = newContent[newContent.length - 1];
        // Remove the prompt tag and add the image URL
        lastMsg.content = lastMsg.content.replace('[IMAGE_PROMPT]', '').trim();
        lastMsg.imageUrl = data.imageUrl;
        return newContent;
      });

    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  // --- MAIN FUNCTION: Handle User Input ---
  const handlePromptSubmit = async (prompt) => {
    if (!prompt.trim() || isLoading) return;

    // 1. Add User Message immediately
    const userEntry = { role: 'user', content: prompt };
    // 2. Add Placeholder Assistant Message (empty for now)
    const placeholderEntry = { role: 'assistant', content: '' };
    
    // Update state with both
    setBookContent(prev => [...prev, userEntry, placeholderEntry]);
    setIsLoading(true);

    try {
      // 3. Make the API Call to Backend
      // Note: We filter out the last empty placeholder before sending context
      const contextMessages = [...bookContent, userEntry].map(msg => ({
        role: msg.role,
        content: msg.content || "" // Ensure content isn't null
      }));

      const response = await fetch(API_URL_CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: contextMessages }),
      });

      if (!response.body) throw new Error("No response body");

      // 4. Handle Streaming Response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullResponse = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;

        // Update the last message (the placeholder) with the new chunk
        setBookContent(currentContent => {
          const newContent = [...currentContent];
          const lastMsg = newContent[newContent.length - 1];
          lastMsg.content = fullResponse;
          return newContent;
        });
      }

      // 5. Check for Image Prompt Tag
      if (fullResponse.includes('[IMAGE_PROMPT]')) {
        // Show temporary status
        setBookContent(currentContent => {
            const newContent = [...currentContent];
            const lastMsg = newContent[newContent.length - 1];
            lastMsg.content = lastMsg.content.replace('[IMAGE_PROMPT]', '\n\n*Summoning image...*');
            return newContent;
        });
        
        // Extract prompt and call image API
        const imagePrompt = fullResponse.split('[IMAGE_PROMPT]')[0].trim();
        await generateImage(imagePrompt);
      }

    } catch (error) {
      console.error("Error:", error);
      setBookContent(prev => {
        const newContent = [...prev];
        const lastMsg = newContent[newContent.length - 1];
        lastMsg.content += "\n\n[System Error: Connection to ATLAS lost.]";
        return newContent;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dm-dashboard">
      {/* Pass the dynamic content to the WorldBook */}
      <WorldBook content={bookContent} />
      
      {/* Pass the API handler to the PromptCorner */}
      <PromptCorner onSubmit={handlePromptSubmit} isLoading={isLoading} />
      
      {/* Keep the other UI components */}
      <CharacterSheet character={character} onOpenModal={() => setIsModalOpen(true)} />
      <DiceTray />
      {isModalOpen && <CharacterModal character={character} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;