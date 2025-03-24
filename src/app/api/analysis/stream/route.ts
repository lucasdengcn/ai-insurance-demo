import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Calculate months from 5 years ago to 100 years old
      const startAge = 30;
      const endAge = 100;
      const totalMonths = (endAge - startAge) * 12;
      const monthlyPremium = 1200;
      const premiumPaymentMonths = 20 * 12; // 20 years payment period

      // Start from 5 years ago
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

      const dataPoints = Array.from({ length: totalMonths }, (_, i) => {
        // Calculate timestamp starting from 5 years ago
        const timestamp = fiveYearsAgo.getTime() + i * 30 * 24 * 60 * 60 * 1000; // Add i months
        // Accumulated premium calculation
        const accumulatedPremium =
          i < premiumPaymentMonths
            ? monthlyPremium * (i + 1)
            : monthlyPremium * (1 + premiumPaymentMonths);

        // Cash value calculation using logarithmic growth
        const timeInYears = i / 12;
        const baseGrowthRate = 0.025; // 6% base annual growth rate

        // Calculate logarithmic multiplier that starts at 0.6 and approaches 1.0
        const logBase = 1.5; // Controls how quickly the logarithmic curve grows
        const minMultiplier = 0.6;
        const maxMultiplier = 1.0;
        const logGrowth = Math.log(1 + timeInYears * logBase) / Math.log(20 * logBase); // Normalized to 20 years
        const cashValueMultiplier = minMultiplier + (maxMultiplier - minMultiplier) * logGrowth;

        const cashValue = Math.floor(
          accumulatedPremium * cashValueMultiplier * Math.pow(1 + baseGrowthRate, timeInYears)
        );

        // Compensation calculation based on accumulated premium
        let compensationMultiplier;
        if (i < premiumPaymentMonths) {
          // During payment: starts at 1.5x and grows steadily
          const progressRatio = i / premiumPaymentMonths;
          compensationMultiplier = 1.5 + progressRatio * 0.5; // 1.5x to 2.0x accumulated premium
        } else {
          const yearsAfterPayment = (i - premiumPaymentMonths) / 12;
          if (yearsAfterPayment <= 10) {
            // First 10 years: stable at 2.0x
            compensationMultiplier = 2.0;
          } else if (yearsAfterPayment <= 20) {
            // Next 10 years: gradual growth to 2.5x
            const growthProgress = (yearsAfterPayment - 10) / 10;
            compensationMultiplier = 2.0 + growthProgress * 0.5;
          } else if (yearsAfterPayment <= 30) {
            // Next 10 years: stable at 2.5x
            compensationMultiplier = 2.5;
          } else {
            // Remaining years: final growth phase to 3.0x
            const finalGrowthProgress = Math.min((yearsAfterPayment - 30) / 10, 1.0);
            compensationMultiplier = 2.5 + finalGrowthProgress * 0.5;
          }
        }

        const compensation = Math.floor(accumulatedPremium * compensationMultiplier);

        return {
          timestamp: timestamp,
          premium: accumulatedPremium,
          cashValue: cashValue,
          compensation: compensation,
        };
      });

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
            recommendations: [
              "Consider increasing liability coverage",
              "Review health insurance terms",
              "Optimize premium payment schedule",
            ],
            riskLevel: "medium",
            timeSeriesData: dataPoints,
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
