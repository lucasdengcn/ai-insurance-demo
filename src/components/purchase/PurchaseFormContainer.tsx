'use client';

interface PurchaseFormContainerProps {
  children: React.ReactNode;
  title?: string;
}

export default function PurchaseFormContainer({ children, title = 'Purchase Insurance' }: PurchaseFormContainerProps) {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
}