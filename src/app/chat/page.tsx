'use client';

import { AnalysisResults } from "@/components/chat/AnalysisResults";
import { ChatHistory } from "@/components/chat/ChatHistory";
import { FileUpload } from "@/components/chat/FileUpload";
import { useChatStore } from "@/lib/store/chatStore";

export default function ChatPage() {
  const analysisResults = useChatStore((state) => state.analysisResults);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Proposal Analysis</h1>
      <div className="flex gap-6">
        <div className="flex w-1/2 flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 h-[600px]">
            <ChatHistory />
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <FileUpload />
          </div>
        </div>
        <div className="w-1/2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-y-auto h-[600px]">
          <AnalysisResults results={analysisResults} />
        </div>
      </div>
    </div>
  );
}