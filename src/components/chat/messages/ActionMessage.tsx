'use client';

import { useState } from 'react';

interface ActionMessageProps {
  content: string;
  role: 'user' | 'assistant';
  actionType?: 'approval' | 'confirm' | 'open' | 'info';
  actionData?: Record<string, any>;
}

export function ActionMessage({ content, role, actionType = 'info', actionData }: ActionMessageProps) {
  const [actionTaken, setActionTaken] = useState(false);

  const handleAction = () => {
    if (actionTaken) return;

    switch (actionType) {
      case 'open':
        if (actionData?.url) {
          window.open(actionData.url, '_blank');
        }
        break;
      case 'approval':
      case 'confirm':
        // In a real app, you might call an API or trigger a state change
        console.log(`Action ${actionType} confirmed:`, actionData);
        break;
    }

    setActionTaken(true);
  };

  // Different icons based on action type
  const renderIcon = () => {
    switch (actionType) {
      case 'approval':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'confirm':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'open':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        );
      default: // info
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  // Action button based on type
  const renderActionButton = () => {
    if (actionType === 'info' || actionTaken) return null;

    const buttonText = {
      approval: 'Approve',
      confirm: 'Confirm',
      open: 'Open Link'
    }[actionType];

    return (
      <button
        onClick={handleAction}
        className={`mt-2 px-4 py-2 rounded-md text-white ${actionTaken ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        disabled={actionTaken}
      >
        {buttonText}
      </button>
    );
  };

  // Action label based on type
  const actionLabel = {
    approval: 'Approval Request',
    confirm: 'Confirmation Required',
    open: 'External Link',
    info: 'Action Notice'
  }[actionType];

  return (
    <div className="flex flex-col" data-role={role}>
      <div className="flex items-center mb-1">
        {renderIcon()}
        <span className="text-sm font-medium">{actionLabel}</span>
      </div>
      <p className="whitespace-pre-wrap break-words mb-2">{content}</p>
      {renderActionButton()}
      {actionTaken && (
        <div className="text-sm text-green-600 mt-1">
          ✓ Action completed
        </div>
      )}
    </div>
  );
}