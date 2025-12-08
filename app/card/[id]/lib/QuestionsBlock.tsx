import React from "react";

export function QuestionsBlock({ questions, onClick }: { questions?: string[]; onClick?: () => void }) {
  if (!questions || questions.length === 0) return null;
  return (
    <div 
      className="flex items-center gap-3 mb-6 cursor-pointer px-4 py-3 rounded-xl transition-all hover:bg-opacity-80" 
      onClick={onClick} 
      tabIndex={0} 
      role="button" 
      aria-label="Вопросы по объекту"
      style={{
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
        transition: "background-color 0.3s ease, color 0.3s ease"
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-base font-[family-name:var(--font-stetica-bold)]" style={{ color: "var(--text-primary)" }}>{questions.length} вопросов</span>
    </div>
  );
}
