'use client';

interface PdfMessageProps {
  message: {
    browserUrl?: string;
    content: string;
  };
  role: 'user' | 'assistant';
  onClick?: () => void;
}

export function PdfMessage({ message, role, onClick }: PdfMessageProps) {
  return (
    <div className="cursor-pointer hover:opacity-90" onClick={onClick}>
      <div className="flex items-center mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span className="text-sm font-medium">PDF Document (Click to view)</span>
      </div>
      <p className="whitespace-pre-wrap break-words">{message.content}</p>
    </div>
  );
}