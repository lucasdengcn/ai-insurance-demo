'use client';

import { ChangeEvent, DragEvent, useState } from "react";

import { analyzePDF } from "@/lib/services/pdfAnalysis";
import { useChatStore } from "@/lib/store/chatStore";
import { useTabsStore } from "@/lib/store/tabsStore";

export function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const addTextMessage = useChatStore((state) => state.addTextMessage);
  const addPdfMessage = useChatStore((state) => state.addPdfMessage);
  const addImageMessage = useChatStore((state) => state.addImageMessage);
  const setCurrentMessage = useChatStore((state) => state.setCurrentMessage);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const displayFile = (file: File) => {
    // Create a URL for the file to display in browser window
    const fileUrl = URL.createObjectURL(file);
    setCurrentMessage({
      id: crypto.randomUUID(),
      content: file.name,
      timestamp: Date.now(),
      role: "user",
      messageType: file.type === "application/pdf" ? "pdf" : "image",
      browserUrl: fileUrl,
    })
    useTabsStore.setState({ activeTab: "browser" });
  };

  const displayMessage = (message: string, fileUrl?: string, fileType?: string) => {
    if (fileType === "application/pdf") {
      addPdfMessage(message, fileUrl || "", "user");
    } else if (fileType?.startsWith("image/")) {
      addImageMessage(message, fileUrl || "", "user");
    } else {
      addTextMessage(message, "user");
    }
  };

  const checkFileSize = (file: File) => {
    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSize) {
      alert("File size exceeds the maximum limit of 10 MB");
      return false;
    }
    return true;
  };

  const checkFileType = (file: File) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a PDF or image file");
      return false;
    }
    return true;
  };

  const validateFiles = (files: File[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!checkFileSize(file)) {
        return false;
      }
      if (!checkFileType(file)) {
        return false;
      }
    }
    return true;
  };

  const processFile = async (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    displayMessage(`Uploaded file: ${file.name}`, fileUrl, file.type);
    displayFile(file);
    if (file.type === "application/pdf") {
      await analyzePDF(file);
    }
  };

  const processFiles = async (files: File[]) => {
    if (!validateFiles(files)) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await processFile(file);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    await processFiles(files);
  };

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      alert("Please upload a PDF or image file");
      return;
    }
    await processFiles(Array.from(files));
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
        aria-label="Upload PDF or image file"
        title="Choose a PDF or image file to upload"
        placeholder="Choose a PDF or image file"
        id="fileInput"
        type="file"
        className="hidden"
        accept=".pdf,image/*"
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
        Drag and drop your PDF or image file here, or click to select
      </p>
    </div>
  );
}