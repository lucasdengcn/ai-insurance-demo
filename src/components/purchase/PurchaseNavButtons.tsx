'use client';

import { useRouter } from 'next/navigation';

interface PurchaseNavButtonsProps {
  onNext: (e: React.FormEvent) => void;
  nextLabel?: string;
  showPrevious?: boolean;
};

export default function PurchaseNavButtons({
  onNext,
  nextLabel = 'Next',
  showPrevious = true
}: PurchaseNavButtonsProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between">
      {showPrevious && (
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Previous
        </button>
      )}
      <button
        type="submit"
        onClick={onNext}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {nextLabel}
      </button>
    </div>
  );
}