'use client';

interface TextMessageProps {
  content: string;
  role: 'user' | 'assistant';
}

export function TextMessage({ content, role }: TextMessageProps) {
  return (
    <p className="whitespace-pre-wrap break-words">
      {content}
    </p>
  );
}