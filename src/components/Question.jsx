import React from "react";

export default function Question({ answers, ops, target }) {
  return (
    <div className="question">
      <div className="slot">{answers[0] || ""}</div>
      <div className="op">{ops && ops[0]}</div>
      <div className="slot">{answers[1] || ""}</div>
      <div className="op">{ops && ops[1]}</div>
      <div className="slot">{answers[2] || ""}</div>
      <div className="equals">= {target}</div>
    </div>
  );
}
