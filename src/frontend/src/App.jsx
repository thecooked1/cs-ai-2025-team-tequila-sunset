import { useState } from 'react';
import './App.css';
import WorldBook from './components/WorldBook';
import PromptCorner from './components/PromptCorner';
import CharacterSheet from './components/CharacterSheet';
import DiceTray from './components/DiceTray';
import CharacterModal from './components/CharacterModal';

// --- MOCK DATA FOR DEMO ---
const MOCK_AI_RESPONSE_TEXT = "The ancient city of Aeridor sleeps beneath the waves. Its once-great spires are now encrusted with coral, and schools of shimmering fish dart through the silent throne room. A faint, magical ward still pulses from the city's heart, protecting a secret lost to time.";
const MOCK_AI_RESPONSE_IMAGE = {
  text: "You encounter a grizzled dwarven warrior. He looks battle-worn, but his eyes are sharp.",
  imageUrl: "https://i.imgur.com/64IuA8V.jpeg" // Our placeholder knight
};
// --- END MOCK DATA ---

function App() {
  const [bookContent, setBookContent] = useState([
    { role: 'assistant', content: 'Welcome to ATLAS. Your story begins...' }
  ]);
  const [character, setCharacter] = useState({
    name: "Lyra Swiftwind",
    // NEW: Add a description for the character
    description: "A nimble rogue with a quick wit and even quicker fingers. Lyra hails from the treetop city of Silverwood, but left in search of adventure and fortune after a dispute with the local thieves' guild. She trusts few, but is fiercely loyal to those who earn it.",
    stats: { STR: 10, DEX: 18, CON: 12, INT: 14, WIS: 16, CHA: 14 },
    picture: "https://i.imgur.com/example-character.png", // Use a real image URL here
    // NEW: Change inventory to an array of objects
    inventory: [
      { name: "Dagger", description: "A simple but sharp blade, well-cared for." },
      { name: "Thieves' Tools", description: "A set of lockpicks, wires, and small mirrors." },
      { name: "Rope (50ft)", description: "Coiled silk rope, strong and light." },
      { name: "Health Potion", description: "A swirling red liquid in a glass vial. Heals minor wounds." }
    ]
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePromptSubmit = (prompt) => {
    // Add user's prompt to the book
    const userEntry = { role: 'user', content: prompt };

    // Simulate an AI response
    // In a real app, this would come from an API
    const aiEntry = prompt.toLowerCase().includes('image')
      ? { role: 'assistant', content: MOCK_AI_RESPONSE_IMAGE.text, imageUrl: MOCK_AI_RESPONSE_IMAGE.imageUrl }
      : { role: 'assistant', content: MOCK_AI_RESPONSE_TEXT };

    setBookContent(prevContent => [...prevContent, userEntry, aiEntry]);
  };

  return (
    <div className="dm-dashboard">
      <WorldBook content={bookContent} />
      <PromptCorner onSubmit={handlePromptSubmit} />
      {/* --- UPDATE THIS COMPONENT'S PROPS --- */}
      <CharacterSheet character={character} onOpenModal={() => setIsModalOpen(true)} />
      <DiceTray />

      {/* --- ADD THIS CONDITIONAL RENDER FOR THE MODAL --- */}
      {isModalOpen && <CharacterModal character={character} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;