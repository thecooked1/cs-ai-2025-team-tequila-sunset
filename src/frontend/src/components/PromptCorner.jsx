import { useState } from 'react';

export default function PromptCorner({ onSubmit }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt);
    setPrompt('');
  };

  return (
    <div className="quadrant prompt-corner">
      <h2>Prompt</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Weave the next thread of the story..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}