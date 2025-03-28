'use client';

import { useRef } from 'react';

interface URLViewerProps {
  url: string;
}

export function URLViewer({ url }: URLViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <iframe
      ref={iframeRef}
      src={url}
      className="w-full h-full min-h-full"
      title="Browser Window"
      sandbox="allow-same-origin allow-scripts"
    />
  );
}