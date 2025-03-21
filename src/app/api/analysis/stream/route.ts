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
            coverageDistribution: {
              "Auto Insurance": 45,
              "Home Insurance": 30,
              "Health Insurance": 20,
              "Life Insurance": 5,
            },
            riskAssessment: {
              "Market Risk": 6.2,
              "Health Risk": 8.1,
              "Liability Risk": 4.5,
              "Natural Disaster Risk": 3.8,
            },
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
