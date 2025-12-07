import { useState, useRef, useEffect } from 'react';
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

  // Placeholder Data
  const [character, setCharacter] = useState({
    name: "Lyra Swiftwind",
    description: "A nimble rogue...",
    stats: { STR: 10, DEX: 18, CON: 12, INT: 14, WIS: 16, CHA: 14 },
    inventory: [{ name: "Dagger", description: "Sharp." }]
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
  // This function takes a list of messages and handles the streaming logic
  const streamResponse = async (messagesToSend) => {
    setIsLoading(true);
    
    // Add placeholder for the new response
    setBookContent(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch(API_URL_CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messagesToSend }),
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
    
    // Update state locally first
    setBookContent(prev => [...prev, userEntry]);
    
    // Prepare context (filter out empty/nulls)
    const contextMessages = [...bookContent, userEntry].map(msg => ({
        role: msg.role,
        content: msg.content || ""
    }));

    await streamResponse(contextMessages);
  };

  // --- HANDLER: Regenerate ---
  const handleRegenerate = async () => {
    if (isLoading || bookContent.length === 0) return;

    // 1. Remove the last message (the bad AI response)
    // We use slice(0, -1) to get everything EXCEPT the last item
    const newHistory = bookContent.slice(0, -1);
    
    // 2. Reset the book content to this previous state
    setBookContent(newHistory);

    // 3. Prepare the messages for the API (cleaning up the history)
    const contextMessages = newHistory.map(msg => ({
        role: msg.role,
        content: msg.content || ""
    }));

    // 4. Call the API again with the same history
    await streamResponse(contextMessages);
  };

  return (
    <div className="dm-dashboard">
      <WorldBook 
        content={bookContent} 
        onRegenerate={handleRegenerate} // Pass the function down
        isLoading={isLoading}           // Pass loading state
      />
      <PromptCorner onSubmit={handlePromptSubmit} isLoading={isLoading} />
      <CharacterSheet character={character} onOpenModal={() => setIsModalOpen(true)} />
      <DiceTray />
      {isModalOpen && <CharacterModal character={character} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;