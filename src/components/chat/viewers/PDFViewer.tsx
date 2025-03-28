'use client';

interface PDFViewerProps {
  url: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
  return (
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
  );
}