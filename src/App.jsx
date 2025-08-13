import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Question from "./components/Question";
import Keypad from "./components/Keypad";
import SubmitButton from "./components/SubmitButton";
import "./App.css";

export default function App() {
   const GAME_DURATION = 360; // 6 minutes in seconds

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
   const [totalTime, setTotalTime] = useState(GAME_DURATION);
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [currentSlot, setCurrentSlot] = useState(0);
  const [usedDigits, setUsedDigits] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Generate random question based on level
  const generateQuestion = (lvl) => {
    const randomNum = (max) => Math.floor(Math.random() * max) + 1;

    let num1 = randomNum(lvl * 3);
    let num2 = randomNum(lvl * 3);
    let num3 = randomNum(lvl * 3);

    const operators = ["+", "-", "×", "÷"];
    let availableOps = lvl > 3 ? [...operators] : ["+", "-"];

    // Ensure op1 and op2 are different
    let op1 = availableOps[Math.floor(Math.random() * availableOps.length)];
    let op2;
    do {
      op2 = availableOps[Math.floor(Math.random() * availableOps.length)];
    } while (op2 === op1);

    // If only +, - case → avoid negative result
    if (availableOps.length === 2) {
      let tempNums = [num1, num2, num3].sort((a, b) => b - a);
      num1 = tempNums[0];
      num2 = tempNums[1];
      num3 = tempNums[2];
    }

    let expression = `${num1} ${op1} ${num2} ${op2} ${num3}`;
    let result = eval(expression.replace(/×/g, "*").replace(/÷/g, "/"));

    // Avoid negative
    if (result < 0) {
      [num1, num3] = [num3, num1];
      expression = `${num1} ${op1} ${num2} ${op2} ${num3}`;
      result = eval(expression.replace(/×/g, "*").replace(/÷/g, "/"));
    }

    return {
      nums: [null, null, null],
      ops: [op1, op2],
      target: Math.round(result),
      original: [num1, num2, num3],
    };
  };

  // Setup new question
  const newQuestion = (lvl) => {
    setQuestion(generateQuestion(lvl));
    setAnswers([]);
    setCurrentSlot(0);
    setTimeLeft(30);
    setUsedDigits([]);
  };

  // Handle digit click
  const handleNumberClick = (num) => {
    if (usedDigits.includes(num) || currentSlot >= question.nums.length) return;

    const updatedAnswers = [...answers];
    updatedAnswers[currentSlot] = num;

    setAnswers(updatedAnswers);
    setCurrentSlot(currentSlot + 1);
    setUsedDigits([...usedDigits, num]);
  };

  // Handle delete
  const handleDelete = () => {
    if (currentSlot === 0) return;

    const updatedAnswers = [...answers];
    const removedDigit = updatedAnswers[currentSlot - 1];

    updatedAnswers[currentSlot - 1] = null;
    setAnswers(updatedAnswers);
    setCurrentSlot(currentSlot - 1);
    setUsedDigits(usedDigits.filter((d) => d !== removedDigit));
  };

  // Submit answer
  const submitAnswer = (fromTimer = false) => {
    const exp = `${answers[0]} ${question.ops[0]} ${answers[1]} ${question.ops[1]} ${answers[2]}`;
    const ans = eval(exp.replace(/×/g, "*").replace(/÷/g, "/"));

    const isCorrect = Math.round(ans) === question.target;

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setCorrectCount((prev) => prev + 1);
      if (!fromTimer) setSubmitStatus("correct");
    } else {
      setWrongCount((prev) => prev + 1);
      if (!fromTimer) setSubmitStatus("wrong");
    }

    const next = () => {
      setLevel((prev) => prev + 1);
      newQuestion(level + 1);
      setSubmitStatus(null);
    };

    fromTimer ? next() : setTimeout(next, 1000);
  };

  // Timer logic
  useEffect(() => {
     if (isGameOver) return;
    if (timeLeft <= 0) {
      submitAnswer(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isGameOver]);

   // Total game timer
  useEffect(() => {
    if (isGameOver) return;
    if (totalTime <= 0) {
      setIsGameOver(true);
      return;
    }
    const totalTimer = setTimeout(() => setTotalTime((prev) => prev - 1), 1000);
    return () => clearTimeout(totalTimer);
  }, [totalTime, isGameOver]);

  // First load
  useEffect(() => {
    newQuestion(level);
  }, []);

   // Restart game
  const restartGame = () => {
    setLevel(1);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTotalTime(GAME_DURATION);
    setIsGameOver(false);
    newQuestion(1);
  };

  return (
    <div className="container">
      {!isGameOver ? (
        <>
          <Header
            score={score}
            level={level}
            timeLeft={timeLeft}
            correctCount={correctCount}
            wrongCount={wrongCount}
          />
          <Question answers={answers} ops={question.ops} target={question.target} />
          <Keypad
            onNumberClick={handleNumberClick}
            onDelete={handleDelete}
            usedDigits={usedDigits}
          />
          {answers.filter((a) => a !== null && a !== undefined).length === 3 && (
            <SubmitButton
              onSubmit={() => submitAnswer(false)}
              status={submitStatus}
            />
          )}
          <div className="total-time">Total Time Left: {totalTime}s</div>
        </>
      ) : (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
          <p>Correct Answers: {correctCount}</p>
          <p>Wrong Answers: {wrongCount}</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
}
