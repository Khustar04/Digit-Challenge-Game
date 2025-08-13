import React from "react";

export default function Header({ score, level, timeLeft, correctCount, wrongCount }) {
  return (
     <>
     <h1>Digit Challenge</h1>
       <div className="header">
      <div>Score: {score}</div>
      <div>Level: {level}</div>
      <div>Correct: {correctCount}</div>
      <div>Wrong: {wrongCount}</div>
      <div>Time Left: {timeLeft}s</div>
    </div>
     </>
  
  );
}
