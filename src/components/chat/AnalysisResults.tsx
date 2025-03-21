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

interface AnalysisResultsProps {
  results: any; // TODO: Define proper type for analysis results
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

  // Sample data structure - replace with actual data from backend
  const sampleData = {
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
                data={sampleData.coverageDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sampleData.coverageDistribution.map((entry, index) => (
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
              data={sampleData.riskAssessment}
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