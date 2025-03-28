'use client';

import { AnalysisResults } from "@/components/chat/AnalysisResults";
import { BrowserWindow } from "@/components/chat/BrowserWindow";
import { ChatHistory } from "@/components/chat/ChatHistory";
import { FileUpload } from "@/components/chat/FileUpload";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/Tabs";
import { useChatStore } from "@/lib/store/chatStore";

export default function ChatPage() {
  const activeTab = useChatStore((state) => state.activeTab);

  return (
    <div className="container mx-auto">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Health Proposal Analysis</h1>
      <div className="flex gap-6 min-h-[600px]">
        <div className="flex w-1/3 flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 h-[600px]">
            <ChatHistory />
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <FileUpload />
          </div>
        </div>
        <div className="w-2/3 flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden h-full min-h-[600px]">
          <Tabs defaultTab={activeTab} className="h-full flex flex-col">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Results Panel</h3>
              <TabList>
                <Tab id="analysis">Analysis</Tab>
                <Tab id="browser">Browser</Tab>
              </TabList>
            </div>
            <div className="flex-1 overflow-auto flex flex-col min-h-0">
              <TabPanel id="analysis">
                <AnalysisResults />
              </TabPanel>
              <TabPanel id="browser">
                <BrowserWindow />
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}