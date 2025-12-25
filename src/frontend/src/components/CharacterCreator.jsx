import React, { useState } from 'react';

export default function CharacterCreator({ onCreate }) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/create-character", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_prompt: prompt })
      });

      if (!response.ok) throw new Error("Creation failed");

      const data = await response.json();
      
      // Pass the new character data up to App.jsx
      onCreate(data);

    } catch (err) {
      console.error(err);
      setError("The spirits failed to weave this soul. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="creator-overlay">
      <div className="creator-card">
        <h1>Forging a New Hero</h1>
        <p>Describe who you want to be. ATLAS will handle the stats.</p>
        
        <form onSubmit={handleSubmit}>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A goblin wizard who thinks he is a tall human, wearing oversized robes..."
            rows={4}
            disabled={isLoading}
          />
          
          {error && <div className="error-msg">{error}</div>}

          <button type="submit" disabled={isLoading || !prompt.trim()} className="create-btn">
            {isLoading ? 'Weaving Fate...' : 'Begin Adventure'}
          </button>
        </form>
      </div>
    </div>
  );
}