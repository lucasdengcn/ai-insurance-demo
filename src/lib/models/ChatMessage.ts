export interface TimeSeriesPoint<T> {
  timestamp: number;
  value: T;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

export interface TimeSeriesDataPoint {
  timestamp: number;
  premium: number;
  cashValue: number;
  compensation: number;
}

export interface AnalysisResult {
  summary: string;
  recommendations: string[];
  riskLevel: "low" | "medium" | "high";
  coverageDistribution: {
    [name: string]: number;
  };
  riskAssessment: {
    [category: string]: number;
  };
  timeSeriesData: TimeSeriesDataPoint[];
}

export class ChatMessageModel implements ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;

  constructor(data: ChatMessage) {
    this.id = data.id;
    this.content = data.content;
    this.role = data.role;
    this.timestamp = data.timestamp;
  }

  static validate(data: Partial<ChatMessage>): boolean {
    return (
      typeof data.id === "string" &&
      typeof data.content === "string" &&
      (data.role === "user" || data.role === "assistant") &&
      typeof data.timestamp === "number"
    );
  }

  toJSON(): ChatMessage {
    return {
      id: this.id,
      content: this.content,
      role: this.role,
      timestamp: this.timestamp,
    };
  }
}

export class AnalysisResultModel implements AnalysisResult {
  summary: string;
  recommendations: string[];
  riskLevel: "low" | "medium" | "high";
  coverageDistribution: { [name: string]: number };
  riskAssessment: { [category: string]: number };
  timeSeriesData: TimeSeriesDataPoint[];

  constructor(data: AnalysisResult) {
    this.summary = data.summary;
    this.recommendations = data.recommendations;
    this.riskLevel = data.riskLevel;
    this.coverageDistribution = data.coverageDistribution;
    this.riskAssessment = data.riskAssessment;
    this.timeSeriesData = data.timeSeriesData;
  }

  static validate(data: Partial<AnalysisResult>): boolean {
    return (
      typeof data.summary === "string" &&
      Array.isArray(data.recommendations) &&
      data.recommendations.every((rec) => typeof rec === "string") &&
      ["low", "medium", "high"].includes(data.riskLevel as string)
    );
  }

  toJSON(): AnalysisResult {
    return {
      summary: this.summary,
      recommendations: this.recommendations,
      riskLevel: this.riskLevel,
      coverageDistribution: this.coverageDistribution,
      riskAssessment: this.riskAssessment,
      timeSeriesData: this.timeSeriesData,
    };
  }
}
