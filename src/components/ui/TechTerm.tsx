import React from "react";

export function TechTerm({
  children,
  href = "https://youtu.be/wkJXyo_xALU?si=4RZ01pXh78_Ng5JT",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border-b border-dotted border-current underline-offset-2 hover:text-blue-500 transition-colors"
      title="Click to understand this term"
    >
      {children}
      <span className="ml-0.5 text-xs align-super">(?)</span>
    </a>
  );
}
