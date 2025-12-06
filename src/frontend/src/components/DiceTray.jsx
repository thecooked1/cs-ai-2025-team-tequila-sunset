import { useState } from 'react';
import Die from './Die'; // Import our new component

const DICE_TYPES = [
  { name: 'd4', sides: 4 }, { name: 'd6', sides: 6 }, { name: 'd8', sides: 8 },
  { name: 'd10', sides: 10 }, { name: 'd12', sides: 12 }, { name: 'd20', sides: 20 },
];

export default function DiceTray() {
  const [selectedDie, setSelectedDie] = useState(null);
  const [result, setResult] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  const selectDie = (die) => {
    setSelectedDie(die);
    setResult(null); // Reset result when a new die is selected
  };

  const rollSelectedDie = () => {
    if (!selectedDie || isRolling) return;

    setIsRolling(true);
    setResult('...');

    // Short delay to allow animation to start
    setTimeout(() => {
      const finalRoll = Math.floor(Math.random() * selectedDie.sides) + 1;
      setResult(finalRoll);
      setIsRolling(false);
    }, 700); // 0.7 second animation
  };

  return (
    <div className="quadrant dice-tray">
      <h2>Dice Tray</h2>
      
      {/* The main rolling area */}
      <div className="rolling-stage" onClick={rollSelectedDie}>
        {selectedDie ? (
          <Die sides={selectedDie.sides} result={result} isRolling={isRolling} />
        ) : (
          <div className="placeholder-text">Select a die to roll</div>
        )}
      </div>

      {/* The buttons to select a die */}
      <div className="dice-buttons">
        {DICE_TYPES.map(die => (
          <button
            key={die.name}
            className={`die-button ${selectedDie?.name === die.name ? 'active' : ''}`}
            onClick={() => selectDie(die)}
            disabled={isRolling}
          >
            {die.name}
          </button>
        ))}
      </div>
    </div>
  );
}