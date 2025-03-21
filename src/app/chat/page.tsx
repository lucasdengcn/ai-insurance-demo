'use client';

import { AnalysisResults } from "@/components/chat/AnalysisResults";
import { ChatHistory } from "@/components/chat/ChatHistory";
import { FileUpload } from "@/components/chat/FileUpload";
import { useState } from "react";

export default function ChatPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ type: "user" | "assistant"; message: string }>>([{
    type: "assistant",
    message: "Hello! Please upload a proposal PDF file for analysis."
  }]);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setChatHistory((prev) => [...prev, { type: "user", message: `Uploaded file: ${file.name}` }]);
    // TODO: Implement file upload and analysis logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Proposal Analysis</h1>
      <div className="flex gap-6">
        <div className="flex w-1/2 flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 h-[600px]">
            <ChatHistory messages={chatHistory} />
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        </div>
        <div className="w-1/2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-y-auto h-[600px]">
          <AnalysisResults results={analysisResults} />
        </div>
      </div>
    </div>
  );
}