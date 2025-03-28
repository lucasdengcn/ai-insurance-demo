'use client';

import { useTabsStore } from '@/lib/store/tabsStore';
import { ReactNode } from 'react';

type TabsProps = {
  defaultTab: string;
  children: ReactNode;
  className?: string;
};

export function Tabs({ defaultTab, children, className = '' }: TabsProps) {
  const activeTab = useTabsStore((state) => state.activeTab);
  const setActiveTab = useTabsStore((state) => state.setActiveTab);

  // Initialize the tab if needed
  if (activeTab !== defaultTab) {
    setActiveTab(defaultTab);
  }

  return (
    <div className={`flex flex-col ${className}`}>{children}</div>
  );
}

type TabListProps = {
  children: ReactNode;
  className?: string;
};

export function TabList({ children, className = '' }: TabListProps) {
  return (
    <div className={`flex border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

type TabProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function Tab({ id, children, className = '' }: TabProps) {
  const activeTab = useTabsStore((state) => state.activeTab);
  const setActiveTab = useTabsStore((state) => state.setActiveTab);
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-sm font-medium ${isActive
        ? 'border-b-2 border-blue-500 text-blue-500'
        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
        } ${className}`}
    >
      {children}
    </button>
  );
}

type TabPanelProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function TabPanel({ id, children, className = '' }: TabPanelProps) {
  const activeTab = useTabsStore((state) => state.activeTab);
  if (activeTab !== id) return null;

  return <div className={`h-full flex flex-col ${className}`}>{children}</div>;
}