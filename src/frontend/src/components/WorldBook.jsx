import ReactMarkdown from 'react-markdown';

export default function WorldBook({ content }) {
  return (
    <div className="quadrant world-book">
      <h2>World Journal</h2>
      <div className="book-content">
        {content.map((entry, index) => (
          <div key={index} className={`book-entry ${entry.role}`}>
            {entry.role === 'user' && <div className="entry-label">Your Prompt</div>}
            <ReactMarkdown>{entry.content}</ReactMarkdown>
            {entry.imageUrl && <img src={entry.imageUrl} alt="Generated art" className="book-image" />}
          </div>
        ))}
      </div>
    </div>
  );
}