import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

// Accept new props: onRegenerate and isLoading
export default function WorldBook({ content, onRegenerate, isLoading }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [content]);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `atlas-art-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <div className="quadrant world-book">
      <h2>World Journal</h2>
      <div className="book-content">
        {content.map((entry, index) => {
          // Check if this is the very last message in the book
          const isLastMessage = index === content.length - 1;

          return (
            <div key={index} className={`book-entry ${entry.role}-wrapper`}>
              <div className="entry-label">
                {entry.role === 'user' ? 'Your Prompt' : 'The Narrator'}
              </div>

              <div className={`entry-text ${entry.role}`}>
                <ReactMarkdown>{entry.content}</ReactMarkdown>
                
                {entry.imageUrl && (
                  <img src={entry.imageUrl} alt="Generated art" className="book-image" />
                )}

                {/* --- ACTION BUTTONS --- */}
                {entry.role === 'assistant' && (
                  <div className="entry-actions">
                    <button 
                      onClick={() => handleCopy(entry.content, index)} 
                      className="action-btn"
                      title="Copy text"
                    >
                      {copiedIndex === index ? '✅ Copied' : '📄 Copy'}
                    </button>

                    {entry.imageUrl && (
                      <button 
                        onClick={() => handleDownload(entry.imageUrl)} 
                        className="action-btn"
                        title="Download Image"
                      >
                        💾 Save Art
                      </button>
                    )}

                    {/* REGENERATE BUTTON: Only show on last message & not loading */}
                    {isLastMessage && !isLoading && (
                      <button 
                        onClick={onRegenerate}
                        className="action-btn"
                        title="Retry this response"
                      >
                        🔄 Regenerate
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}