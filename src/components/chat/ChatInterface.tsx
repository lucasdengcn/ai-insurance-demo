'use client';

import { AnalysisResults } from "@/components/chat/AnalysisResults";
import { FileUpload } from "@/components/chat/FileUpload";
import { useChatStore } from "@/lib/store/chatStore";
import { ChatHistory } from "./ChatHistory";

export default function ChatInterface() {
  const selectedFile = useChatStore((state) => state.selectedFile);
  const isAnalyzing = useChatStore((state) => state.isAnalyzing);
  const analysisResults = useChatStore((state) => state.analysisResults);

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-6 p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex w-1/2 flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <ChatHistory />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <FileUpload />
        </div>
      </div>
      <div className="w-1/2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-y-auto">
        <AnalysisResults results={analysisResults} />
      </div>
    </div>
  );
}