import React from "react";

export default function SubmitButton({ onSubmit, status }) {
  const getColor = () => {
    if (status === "correct") return "green";
    if (status === "wrong") return "red";
    return "#4CAF50";
  };

  return (
    <button
      className="submit"
      onClick={onSubmit}
      style={{ background: getColor(), color: "white" }}
    >
      Submit
    </button>
  );
}
