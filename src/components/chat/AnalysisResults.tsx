import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AnalysisResult } from "../../lib/models/ChatMessage";

interface AnalysisResultsProps {
  results: AnalysisResult | null;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function AnalysisResults({ results }: AnalysisResultsProps) {
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

  return (
    <div className="space-y-6">
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
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData.riskAssessment}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}