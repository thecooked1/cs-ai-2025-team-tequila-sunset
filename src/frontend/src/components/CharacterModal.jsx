// src/frontend/src/components/CharacterModal.jsx

export default function CharacterModal({ character, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <h2>{character.name}</h2>
        <div className="modal-body">
          <img src={character.picture} alt={character.name} className="modal-char-picture" />
          <p>{character.description}</p>
        </div>
      </div>
    </div>
  );
}