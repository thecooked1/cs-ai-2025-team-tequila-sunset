// src/frontend/src/components/CharacterSheet.jsx

export default function CharacterSheet({ character, onOpenModal }) {
  return (
    <div className="quadrant character-sheet">
      <h2>Character</h2>
      <div className="character-main">
        {/* The image now has an onClick handler */}
        <img 
          src={character.picture} 
          alt={character.name} 
          className="char-picture clickable" 
          onClick={onOpenModal}
          title="Click for description"
        />
        <div className="char-info">
          <h3>{character.name}</h3>
          <div className="char-stats">
            {Object.entries(character.stats).map(([stat, value]) => (
              <div key={stat} className="stat-box">
                <div className="stat-name">{stat}</div>
                <div className="stat-value">{value}</div>
              </div>
            ))}
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