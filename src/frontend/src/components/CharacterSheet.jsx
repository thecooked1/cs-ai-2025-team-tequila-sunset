// src/frontend/src/components/CharacterSheet.jsx

export default function CharacterSheet({ character, onOpenModal }) {
  if (!character) return null;
  const imageUrl = character.picture_url || character.picture;  
  
  return (
    <div className="quadrant character-sheet">
      <h2>Character</h2>
      <div className="character-main">
        {/* The image now has an onClick handler */}
        <img 
          src={imageUrl} 
          alt={character.name} 
          className="char-picture clickable" 
          onClick={onOpenModal}
          title="Click for description"
        />
        <div className="char-info">
          <h3>{character.name}</h3>
          <span className="char-level">Lvl {character.level || 1}</span>
          <div className="char-stats">
            {Object.entries(character.stats).map(([stat, value]) => {
              // Calculate D&D Modifier: (Score - 10) / 2
              const mod = Math.floor((value - 10) / 2);
              const sign = mod >= 0 ? '+' : '';
              return (
              <div key={stat} className="stat-box">
                <div className="stat-name">{stat}</div>
                <div className="stat-value">{value}</div>
                <div className="stat-modifier">{sign}{mod}</div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
      
      {/* The new inventory section */}
      <div className="char-inventory">
        <h4>Inventory</h4>
        <div className="inventory-grid">
          {character.inventory.map((item, index) => (
            <div key={index} className="inventory-item">
              {item.name}
              <div className="item-description">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}