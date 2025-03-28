'use client';

import { useChatStore } from '@/lib/store/chatStore';

export function ActionMessageSamples() {
  const {
    addActionMessage,
    addApprovalMessage,
    addConfirmMessage,
    addOpenLinkMessage
  } = useChatStore();

  const addSampleMessages = () => {
    // Add a simple info action message
    addActionMessage(
      'This is a simple information action message with no interactive elements.',
      'assistant'
    );

    // Add an approval action message
    addApprovalMessage(
      'Please approve this policy change request. The premium will increase by $25/month but provides additional coverage for natural disasters.',
      'assistant',
      { policyId: 'POL-12345', changeType: 'coverage-increase', premiumChange: 25 }
    );

    // Add a confirmation action message
    addConfirmMessage(
      'Are you sure you want to submit your claim? Once submitted, you cannot modify the details.',
      'assistant',
      { claimId: 'CLM-78901', claimAmount: 1500, claimType: 'property-damage' }
    );

    // Add an open link action message
    addOpenLinkMessage(
      'View your policy details in our customer portal.',
      'https://example.com/insurance-portal',
      'assistant'
    );
  };

  return (
    <div className="mt-4">
      <button
        onClick={addSampleMessages}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Sample Action Messages
      </button>
    </div>
  );
}