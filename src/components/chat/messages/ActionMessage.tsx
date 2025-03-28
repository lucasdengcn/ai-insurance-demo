'use client';

interface ActionMessageProps {
  content: string;
  role: 'user' | 'assistant';
}

export function ActionMessage({ content, role }: ActionMessageProps) {
  return (
    <div className="flex items-center mb-1">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <span className="text-sm font-medium">Action Notice</span>
      <p className="whitespace-pre-wrap break-words">{content}</p>
    </div>
  );
}