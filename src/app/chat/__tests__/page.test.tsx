import { render, screen } from '@testing-library/react';
import ChatPage from '../page';

// Mock the stores
jest.mock('@/lib/store/chatStore', () => ({
  useChatStore: jest.fn().mockReturnValue({
    messages: [
      {
        id: 'test-message',
        role: 'assistant',
        content: 'Hello! Please upload a proposal PDF file for analysis.',
        timestamp: Date.now(),
        messageType: 'text'
      }
    ],
    addTextMessage: jest.fn(),
    addPdfMessage: jest.fn(),
    addImageMessage: jest.fn(),
    addActionMessage: jest.fn(),
  }),
}));

jest.mock('@/lib/store/tabsStore', () => ({
  useTabsStore: jest.fn().mockReturnValue({
    activeTab: 'analysis',
    setActiveTab: jest.fn(),
  }),
}));

jest.mock('@/lib/store/browserStore', () => ({
  useBrowserStore: jest.fn().mockReturnValue({
    browserTarget: '',
    targetType: '',
    setBrowserTarget: jest.fn(),
  }),
}));

// Mock the WebSocket hook
jest.mock('@/lib/hooks/useWebSocket', () => ({
  useWebSocket: jest.fn(),
}));

// Mock the components
jest.mock('@/components/chat/ChatHistory', () => ({
  ChatHistory: function MockChatHistory() {
    return <div data-testid="chat-history">Chat History Mock</div>;
  }
}));

jest.mock('@/components/chat/FileUpload', () => ({
  FileUpload: function MockFileUpload() {
    return <div data-testid="file-upload">File Upload Mock</div>;
  }
}));

jest.mock('@/components/chat/ActionMessageSamples', () => ({
  ActionMessageSamples: function MockActionMessageSamples() {
    return <div data-testid="action-samples">Action Samples Mock</div>;
  }
}));

jest.mock('@/components/chat/AnalysisResults', () => ({
  AnalysisResults: function MockAnalysisResults() {
    return <div data-testid="analysis-results">Analysis Results Mock</div>;
  }
}));

jest.mock('@/components/chat/BrowserWindow', () => ({
  BrowserWindow: function MockBrowserWindow() {
    return <div data-testid="browser-window">Browser Window Mock</div>;
  }
}));

// Mock the UI components
jest.mock('@/components/ui/Tabs', () => ({
  Tabs: ({ children }) => <div data-testid="tabs">{children}</div>,
  TabList: ({ children }) => <div data-testid="tab-list">{children}</div>,
  Tab: ({ children }) => <div data-testid="tab">{children}</div>,
  TabPanel: ({ id, children }) => id === 'analysis' ? <div data-testid="tab-panel">{children}</div> : null
}));

describe('Chat Page', () => {
  it('renders the chat interface', () => {
    render(<ChatPage />);

    // Check for main containers
    expect(screen.getByText('Results Panel')).toBeInTheDocument();

    // Check for mocked components
    expect(screen.getByTestId('chat-history')).toBeInTheDocument();
    expect(screen.getByTestId('file-upload')).toBeInTheDocument();
    expect(screen.getByTestId('action-samples')).toBeInTheDocument();
    expect(screen.getByTestId('analysis-results')).toBeInTheDocument();

    // Browser window should not be visible initially as 'analysis' is the default tab
    expect(screen.queryByTestId('browser-window')).not.toBeInTheDocument();
  });

  it('renders the tab buttons', () => {
    render(<ChatPage />);

    expect(screen.getByText('Analysis')).toBeInTheDocument();
    expect(screen.getByText('Browser')).toBeInTheDocument();
  });
});