'use client';

import { AnalysisResults } from "@/components/chat/AnalysisResults";
import { ChatHistory } from "@/components/chat/ChatHistory";
import { FileUpload } from "@/components/chat/FileUpload";

export default function ChatPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Health Proposal Analysis</h1>
      <div className="flex gap-6 min-h-[600px]">
        <div className="flex w-1/2 flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 h-[600px]">
            <ChatHistory />
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <FileUpload />
          </div>
        </div>
        <div className="flex-1 flex flex-col w-1/2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden h-full min-h-[600px]">
          <AnalysisResults />
        </div>
      </div>
    </div>
  );
}