'use client';

import { useChatStore } from "@/lib/store/chatStore";
import { useEffect, useRef, useState } from 'react';


export function BrowserWindow() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPdf, setIsPdf] = useState(false);
  let url = useChatStore((state) => state.browserWindowUrl);
  if (!url) {
    url = "/deepseek.pdf";
  }

  useEffect(() => {
    // Check if the URL is a PDF file
    const isPdfFile = url.toLowerCase().endsWith('.pdf');
    setIsPdf(isPdfFile);
  }, [url]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded-t-lg">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-white dark:bg-gray-600 rounded-md px-3 py-1 text-sm truncate text-center">
            {url}
          </div>
        </div>
        <div className="w-6"></div> {/* Spacer for balance */}
      </div>
      <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden min-h-0">
        {isPdf ? (
          <object
            data={url}
            type="application/pdf"
            className="w-full h-full min-h-[800px] flex flex-col items-center justify-center p-4"
          >
            <div className="flex items-center justify-center h-full flex-col p-4">
              <p className="text-red-500 mb-2">Unable to display PDF directly.</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Download PDF
              </a>
            </div>
          </object>
        ) : (
          <iframe
            ref={iframeRef}
            src={url}
            className="w-full h-full min-h-full"
            title="Browser Window"
            sandbox="allow-same-origin allow-scripts"
          />
        )}
      </div>
    </div>
  );
}