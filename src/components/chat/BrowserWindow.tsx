'use client';

import { useChatStore } from "@/lib/store/chatStore";
import { useEffect, useRef, useState } from 'react';


export function BrowserWindow() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPdf, setIsPdf] = useState(false);
  let url = useChatStore((state) => state.browserWindowUrl);
  const fileType = useChatStore((state) => state.fileType);
  // Log the URL to the console for debugging purposes
  console.log("BrowserWindow url: " + url + " fileType: " + fileType);
  if (!url) {
    url = "/deepseek.pdf";
  }

  useEffect(() => {
    // Check if the URL is a PDF file
    const isPdfFile = fileType && fileType.endsWith('pdf') || url.toLowerCase().endsWith('.pdf');
    setIsPdf(isPdfFile);
  }, [fileType, url]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden min-h-0">
        {isPdf ? (
          <object
            data={url}
            type="application/pdf"
            className="w-full h-full flex flex-col items-center justify-center min-h-[800px]"
          >
            <param name="view" value="FitH" />
            <param name="zoom" value="100" />
            <param name="navpanes" value="1" />
            <param name="toolbar" value="1" />
            <param name="statusbar" value="1" />
            <param name="scrollbar" value="1" />
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