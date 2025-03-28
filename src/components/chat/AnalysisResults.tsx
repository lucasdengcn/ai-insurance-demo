import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useChatStore } from "@/lib/store/chatStore";
import { AnalysisResult } from "../../lib/models/ChatMessage";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function AnalysisResults() {
  const results = useChatStore((state) => state.analysisResults);

  if (!results) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
        <p>Upload a PDF file to see analysis results</p>
      </div>
    );
  }

  const coverageData = results.coverageDistribution;
  const riskData = results.riskAssessment;

  const chartData = {
    coverageDistribution: Object.entries(coverageData).map(([name, value]) => ({
      name,
      value,
    })),
    riskAssessment: Object.entries(riskData).map(([category, score]) => ({
      category,
      score,
    })),
  };

  const formatTimeSeriesData = (data: AnalysisResult["timeSeriesData"]) => {
    const formattedData = data.map(point => ({
      timestamp: new Date(point.timestamp).toLocaleDateString(),
      accumulatedPremium: point.premium,
      cashValue: parseFloat(point.cashValue.toFixed(2)),
      compensation: parseFloat(point.compensation.toFixed(2))
    }));

    let crossoverPoint = null;
    for (let i = 0; i < data.length; i++) {
      const point = data[i];
      if (!crossoverPoint && point.cashValue >= point.premium) {
        crossoverPoint = {
          timestamp: point.timestamp,
          cashValue: point.cashValue,
          accumulatedPremium: point.premium,
          compensation: point.compensation
        };
        break;
      }
    }

    return { formattedData, crossoverPoint };
  };

  const { formattedData, crossoverPoint } = formatTimeSeriesData(results.timeSeriesData);

  return (
    <div className="space-y-6 h-full m-4">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Premium vs Cash Value Analysis
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: 20 }} />
              <Line
                type="monotone"
                dataKey="accumulatedPremium"
                stroke="#8884d8"
                name="Accumulated Premium"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="cashValue"
                stroke="#82ca9d"
                name="Cash Value"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="compensation"
                stroke="#ffc658"
                name="Compensation"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {crossoverPoint && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            The cash value ({crossoverPoint.cashValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })})
            exceeds the accumulated premium ({crossoverPoint.accumulatedPremium.toLocaleString('en-US', { style: 'currency', currency: 'USD' })})
            on {new Date(crossoverPoint.timestamp).toLocaleDateString()}.
          </p>
        )}
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Coverage Distribution
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData.coverageDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.coverageDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Risk Assessment</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData.riskAssessment}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: 20 }} />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};