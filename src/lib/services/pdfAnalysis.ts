import { Message } from "@/components/chat/ChatHistory";

export interface AnalysisResult {
  coverageDistribution: Array<{ name: string; value: number }>;
  riskAssessment: Array<{ category: string; score: number }>;
  summary: string;
}

export async function analyzePDF(file: File): Promise<{
  message: Message;
  results: AnalysisResult | null;
}> {
  try {
    // TODO: Replace with actual API endpoint
    const formData = new FormData();
    formData.append("file", file);

    // Simulate API call with timeout
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock response data
    const mockResults: AnalysisResult = {
      coverageDistribution: [
        { name: "Health", value: 35 },
        { name: "Life", value: 25 },
        { name: "Property", value: 20 },
        { name: "Auto", value: 20 },
      ],
      riskAssessment: [
        { category: "Financial", score: 85 },
        { category: "Health", score: 72 },
        { category: "Liability", score: 68 },
        { category: "Property", score: 90 },
      ],
      summary:
        "The proposal includes comprehensive coverage across multiple insurance types with a strong focus on health and life insurance. Risk assessment indicates good financial stability with some areas for improvement in liability coverage.",
    };

    return {
      message: {
        type: "assistant",
        message: `Analysis complete! Here's a summary of the proposal:\n\n${mockResults.summary}`,
      },
      results: mockResults,
    };
  } catch (error) {
    console.error("Error analyzing PDF:", error);
    return {
      message: {
        type: "assistant",
        message: "Sorry, there was an error analyzing the PDF file. Please try again.",
      },
      results: null,
    };
  }
}
