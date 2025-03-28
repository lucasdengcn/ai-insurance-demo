'use client';

import { useChatStore } from "@/lib/store/chatStore";

// Import specialized viewer components
import { ImageViewer } from "./viewers/ImageViewer";
import { PDFViewer } from "./viewers/PDFViewer";
import { URLViewer } from "./viewers/URLViewer";

export function BrowserWindow() {
  const currentMessage = useChatStore((state) => state.currentMessage);
  const messageType = currentMessage?.messageType;
  const url = currentMessage?.browserUrl || '';

  // Log the current message for debugging
  console.log("BrowserWindow currentMessage:", currentMessage);

  // Determine content type based on message
  const isPdf = messageType === 'pdf';
  const isImage = messageType === 'image';

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden min-h-0">
        {isPdf ? (
          <PDFViewer url={url} />
        ) : isImage ? (
          <ImageViewer url={url} />
        ) : (
          <URLViewer url={url} />
        )}
      </div>
    </div>
  );
}