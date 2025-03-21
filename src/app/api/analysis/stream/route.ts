import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Simulate analysis steps with messages
      const steps = [
        { message: "Analyzing document structure..." },
        { message: "Extracting coverage information..." },
        { message: "Evaluating risk factors..." },
        {
          message: "Analysis complete!",
          results: {
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
          },
        },
      ];

      for (const step of steps) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(step)}\n\n`));
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
