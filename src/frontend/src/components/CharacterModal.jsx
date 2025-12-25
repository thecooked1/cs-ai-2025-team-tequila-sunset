// src/frontend/src/components/CharacterModal.jsx

export default function CharacterModal({ character, onClose }) {
  if (!character) return null;
  const imageUrl = character.picture_url || character.picture;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <h2>{character.name}</h2>
        <div className="modal-body">
          <img src={imageUrl} alt={character.name} className="modal-char-picture" />
          <p>{character.description}</p>
        </div>
      </div>
    </div>
  );
}