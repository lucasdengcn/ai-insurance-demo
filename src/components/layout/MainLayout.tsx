import Link from "next/link";
import { ReactNode } from "react";
import { ChatButton } from "../chat/ChatButton";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <nav className="w-full flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              AI Insurance / Health Proposal Analysis
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/purchase/phone-verification"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Purchase
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Profile
            </Link>
            <ChatButton />
          </div>
        </nav>
      </header>
      <main className="w-full px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AI Insurance. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}