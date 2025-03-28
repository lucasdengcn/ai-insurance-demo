'use client';

import { useBrowserStore } from "@/lib/store/browserStore";

// Import specialized viewer components
import { ImageViewer } from "./viewers/ImageViewer";
import { PDFViewer } from "./viewers/PDFViewer";
import { URLViewer } from "./viewers/URLViewer";

export function BrowserWindow() {
  const url = useBrowserStore((state) => state.url);
  const contentType = useBrowserStore((state) => state.contentType);

  // Log the current state for debugging
  console.log("BrowserWindow state:", { url, contentType });

  // Determine content type
  const isPdf = contentType === 'pdf';
  const isImage = contentType === 'image';

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