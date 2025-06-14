"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import GlassCard from "../common/GlassCard";

const ConfusionMatrix = ({ testResults }) => {
  // Calculate confusion matrix values from test results
  const calculateConfusionMatrix = (results) => {
    let tp = 0,
      fp = 0,
      tn = 0,
      fn = 0;

    results.tests.forEach((test) => {
      // Classify based on expected vs actual outcomes
      const expectedSuccess =
        test.route.includes("GET") ||
        (test.statusCode >= 200 && test.statusCode < 300);
      const actualSuccess = test.status === "passed";

      if (expectedSuccess && actualSuccess) tp++;
      else if (!expectedSuccess && !actualSuccess) tn++;
      else if (!expectedSuccess && actualSuccess) fp++;
      else if (expectedSuccess && !actualSuccess) fn++;
    });

    return { tp, fp, tn, fn };
  };

  const { tp, fp, tn, fn } = calculateConfusionMatrix(testResults);

  const matrixData = [
    {
      name: "True Positive",
      value: tp,
      color: "#10b981",
      description: "Correctly passed tests",
    },
    {
      name: "False Positive",
      value: fp,
      color: "#f59e0b",
      description: "Incorrectly passed tests",
    },
    {
      name: "True Negative",
      value: tn,
      color: "#6b7280",
      description: "Correctly failed tests",
    },
    {
      name: "False Negative",
      value: fn,
      color: "#ef4444",
      description: "Incorrectly failed tests",
    },
  ];

  const total = tp + fp + tn + fn;
  const accuracy = total > 0 ? (((tp + tn) / total) * 100).toFixed(1) : 0;
  const precision = tp + fp > 0 ? ((tp / (tp + fp)) * 100).toFixed(1) : 0;
  const recall = tp + fn > 0 ? ((tp / (tp + fn)) * 100).toFixed(1) : 0;

  return (
    <GlassCard className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Test Classification Matrix
        </h3>
        <p className="text-white/60 text-sm">
          Analysis of test prediction accuracy
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matrix Visualization */}
        <div>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={matrixData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="name"
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {matrixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-2 gap-4">
            {matrixData.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-white font-medium text-sm">
                    {item.name}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {item.value}
                </div>
                <p className="text-white/60 text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 font-medium">Accuracy</span>
              <span className="text-2xl font-bold text-green-400">
                {accuracy}%
              </span>
            </div>
            <p className="text-white/60 text-sm">
              Overall test classification accuracy
            </p>
            <div className="w-full bg-white/10 rounded-full h-2 mt-3">
              <div
                className="bg-green-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 font-medium">Precision</span>
              <span className="text-2xl font-bold text-blue-400">
                {precision}%
              </span>
            </div>
            <p className="text-white/60 text-sm">
              Proportion of true positives
            </p>
            <div className="w-full bg-white/10 rounded-full h-2 mt-3">
              <div
                className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${precision}%` }}
              />
            </div>
          </div>

          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-400 font-medium">Recall</span>
              <span className="text-2xl font-bold text-purple-400">
                {recall}%
              </span>
            </div>
            <p className="text-white/60 text-sm">
              Proportion of actual positives identified
            </p>
            <div className="w-full bg-white/10 rounded-full h-2 mt-3">
              <div
                className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${recall}%` }}
              />
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <h4 className="text-white font-medium mb-3">
              Classification Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Total Tests:</span>
                <span className="text-white">{total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Correctly Classified:</span>
                <span className="text-white">{tp + tn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Misclassified:</span>
                <span className="text-white">{fp + fn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ConfusionMatrix;
