'use client';

import Image from "next/image";

interface ImageViewerProps {
  url: string;
}

export function ImageViewer({ url }: ImageViewerProps) {
  return (
    <div className="w-full h-full overflow-hidden p-4 relative min-h-[400px]">
      <Image
        src={url}
        alt="Uploaded image"
        className="object-contain"
        priority
        fill
        sizes="(max-height: 600px) 80vh, (max-width: 600px) 80vw, 80%"
      />
    </div>
  );
}