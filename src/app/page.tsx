
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Left sidebar */}
      <aside className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 hidden md:block">
        <nav className="space-y-4">
          <div className="font-medium text-gray-900 dark:text-white">Quick Links</div>
          <ul className="space-y-2">
            <li>
              <Link href="/insurance-plans" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2">
                <span>Insurance Plans</span>
              </Link>
            </li>
            <li>
              <Link href="/claims" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2">
                <span>Claims</span>
              </Link>
            </li>
            <li>
              <Link href="/documents" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2">
                <span>Documents</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Welcome to AI Insurance</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Insurance Overview</h2>
            <p className="text-gray-600 dark:text-gray-300">View and manage your insurance policies in one place.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <p className="text-gray-600 dark:text-gray-300">File a claim or contact support with just a few clicks.</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Active Policies</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Open Claims</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Next Payment</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">$249.99</p>
          </div>
        </div>
      </main>
    </div>
  );
}
