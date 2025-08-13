import React from "react";

export default function Keypad({ onNumberClick, onDelete, usedDigits }) {
  return (
    <div className="keypad">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <button
          key={n}
          onClick={() => onNumberClick(n)}
          disabled={usedDigits.includes(n)} // Disable button if digit is already used
          style={{
            opacity: usedDigits.includes(n) ? 0.5 : 1,
            cursor: usedDigits.includes(n) ? "not-allowed" : "pointer"
          }}
        >
          {n}
        </button>
      ))}
      <button className="delete" onClick={onDelete}>
        🗑
      </button>
    </div>
  );
}
