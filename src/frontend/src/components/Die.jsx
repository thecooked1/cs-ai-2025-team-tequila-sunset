// src/frontend/src/components/Die.jsx

// This component is a visual dictionary of dice SVGs.
// The SVG path data defines the shape of each die.
export default function Die({ sides, result, isRolling }) {
  let dieSvg;

  // A switch to pick the correct SVG based on the number of sides
  switch (sides) {
    case 4:
      dieSvg = <path d="M50 5 L95 80 H5 Z" />;
      break;
    case 6:
      dieSvg = <path d="M10 10 H90 V90 H10 Z" />;
      break;
    case 8:
      dieSvg = <path d="M50 5 L95 50 L50 95 L5 50 Z" />;
      break;
    case 10:
      dieSvg = <path d="M50 5 L95 40 L80 95 H20 L5 40 Z" />;
      break;
    case 12:
      dieSvg = <path d="M50 5 L85 25 L95 60 L50 95 L5 60 L15 25 Z" />;
      break;
    case 20:
      dieSvg = <path d="M50 5 L5 35 L25 90 H75 L95 35 Z" />;
      break;
    default:
      dieSvg = <circle cx="50" cy="50" r="45" />;
  }

  return (
    <div className={`die-visual ${isRolling ? 'rolling' : ''}`}>
      <svg viewBox="0 0 100 100" className="die-svg">
        {dieSvg}
        <text x="50" y="55" className="die-text">
          {result}
        </text>
      </svg>
    </div>
  );
}