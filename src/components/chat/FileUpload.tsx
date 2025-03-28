'use client';

import { ChangeEvent, DragEvent, useState } from "react";

import { ChatMessageModel } from "@/lib/models/ChatMessage";
import { analyzePDF } from "@/lib/services/pdfAnalysis";
import { useChatStore } from "@/lib/store/chatStore";

export function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const setSelectedFile = useChatStore((state) => state.setSelectedFile);
  const addMessage = useChatStore((state) => state.addMessage);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find((file) => file.type === "application/pdf");

    if (pdfFile) {
      setSelectedFile(pdfFile, pdfFile.type);
      addMessage(new ChatMessageModel({
        id: crypto.randomUUID(),
        role: "user",
        content: `Uploaded file: ${pdfFile.name}`,
        timestamp: Date.now(),
      }));
      await analyzePDF(pdfFile);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && files[0].type === "application/pdf") {
      setSelectedFile(files[0], files[0].type);
      addMessage(new ChatMessageModel({
        id: crypto.randomUUID(),
        role: "user",
        content: `Uploaded file: ${files[0].name}`,
        timestamp: Date.now(),
      }))
      await analyzePDF(files[0]);
    } else {
      alert("Please upload a PDF file");
    }
  };

  return (
    <div
      className={`mt-4 flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      <input
        aria-label="Upload PDF file"
        title="Choose a PDF file to upload"
        placeholder="Choose a PDF file"
        id="fileInput"
        type="file"
        className="hidden"
        accept=".pdf"
        onChange={handleFileInput}
      />
      <svg
        className="mb-2 h-8 w-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Drag and drop your PDF file here, or click to select
      </p>
    </div>
  );
}