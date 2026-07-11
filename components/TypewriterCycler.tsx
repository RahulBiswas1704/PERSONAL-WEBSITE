"use client";

import { useState, useEffect } from "react";

const roles = [
  "Full-stack Developer",
  "Seafarer Dreamer",
  "Self-taught Builder",
  "Tech Enthusiast",
  "Problem Solver"
];

export default function TypewriterCycler() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const i = loopNum % roles.length;
    const fullText = roles[i];

    const handleType = () => {
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 100);

      if (!isDeleting && text === fullText) {
        // Pause at the end before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        // Pause before typing next word
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="text-accent inline-block min-w-[220px]">
      {text}
      <span className="animate-pulse text-foreground ml-[1px]">|</span>
    </span>
  );
}
