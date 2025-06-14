"use client";

import { ChevronLeft, ChevronRight, Download, Play } from "lucide-react";
import { useEffect, useState } from "react";
import ConfusionMatrix from "../components/charts/ConfusionMatrix";
import Button from "../components/common/Button";
import GlassCard from "../components/common/GlassCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import FileUpload from "../components/forms/FileUpload";
import Header from "../components/layout/Header";
import { useAppState } from "../context/AppStateContext";
import { useAuth } from "../context/AuthContext";

const MainTool = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth();
  const { state, actions } = useAppState();
  const [baseUrl, setBaseUrl] = useState("");
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      onNavigate("login");
    }
  }, [isAuthenticated, onNavigate]);

  const steps = [
    {
      id: 1,
      title: "Upload Specification",
      description: "Upload your OpenAPI spec file",
    },
    {
      id: 2,
      title: "Configure Base URL",
      description: "Set your API base URL",
    },
    {
      id: 3,
      title: "Security Settings",
      description: "Configure authentication",
    },
    { id: 4, title: "Select Routes", description: "Choose endpoints to test" },
    { id: 5, title: "Run Tests", description: "Execute and view results" },
  ];

  const handleFileUpload = (file) => {
    // Simulate file processing
    const mockSpec = {
      info: { title: "Sample API", version: "1.0.0" },
      servers: [{ url: "https://api.example.com" }],
      paths: {
        "/users": {
          get: { summary: "Get users", parameters: [] },
          post: { summary: "Create user", requestBody: {} },
        },
        "/users/{id}": {
          get: {
            summary: "Get user by ID",
            parameters: [{ name: "id", in: "path", required: true }],
          },
          put: {
            summary: "Update user",
            parameters: [{ name: "id", in: "path", required: true }],
          },
          delete: {
            summary: "Delete user",
            parameters: [{ name: "id", in: "path", required: true }],
          },
        },
      },
    };

    actions.setUploadedSpec(mockSpec);
    setBaseUrl(mockSpec.servers[0]?.url || "");
    actions.setCurrentStep(2);
  };

  const handleNextStep = () => {
    if (state.currentStep < 5) {
      actions.setCurrentStep(state.currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (state.currentStep > 1) {
      actions.setCurrentStep(state.currentStep - 1);
    }
  };

  const handleRunTests = async () => {
    actions.setLoading(true);

    // Simulate test execution
    setTimeout(() => {
      const mockResults = {
        summary: {
          total: 15,
          passed: 12,
          failed: 3,
          skipped: 0,
          successRate: 80,
          duration: 2.5,
        },
        tests: [
          {
            route: "GET /users",
            status: "passed",
            responseTime: 120,
            statusCode: 200,
          },
          {
            route: "POST /users",
            status: "passed",
            responseTime: 250,
            statusCode: 201,
          },
          {
            route: "GET /users/{id}",
            status: "failed",
            responseTime: 0,
            statusCode: 404,
            error: "User not found",
          },
          {
            route: "PUT /users/{id}",
            status: "passed",
            responseTime: 180,
            statusCode: 200,
          },
          {
            route: "DELETE /users/{id}",
            status: "failed",
            responseTime: 0,
            statusCode: 403,
            error: "Forbidden",
          },
        ],
      };

      actions.setTestResults(mockResults);
      actions.setLoading(false);

      // Add to session history
      const session = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        specName: state.uploadedSpec?.info?.title || "Unknown API",
        results: mockResults,
        duration: mockResults.summary.duration,
      };
      actions.addTestSession(session);
    }, 3000);
  };

  const renderStepContent = () => {
    switch (state.currentStep) {
      case 1:
        return <FileUpload onFileUpload={handleFileUpload} />;

      case 2:
        return (
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Configure Base URL
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  API Base URL
                </label>
                <input
                  type="url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="glass-input w-full px-4 py-3 text-white placeholder-white/50"
                  placeholder="https://api.example.com"
                />
                <p className="text-white/60 text-sm mt-2">
                  This URL will be used as the base for all API requests
                </p>
              </div>
              {state.uploadedSpec && (
                <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <h4 className="text-white font-medium mb-2">
                    Detected from Specification:
                  </h4>
                  <p className="text-blue-400 text-sm">
                    {state.uploadedSpec.servers?.[0]?.url}
                  </p>
                </div>
              )}
            </div>
          </GlassCard>
        );

      case 3:
        return (
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Security Configuration
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Authentication Type
                </label>
                <select className="glass-input w-full px-4 py-3 text-white">
                  <option value="">No Authentication</option>
                  <option value="bearer">Bearer Token</option>
                  <option value="apikey">API Key</option>
                  <option value="basic">Basic Auth</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  API Key / Token
                </label>
                <input
                  type="password"
                  className="glass-input w-full px-4 py-3 text-white placeholder-white/50"
                  placeholder="Enter your API key or token"
                />
              </div>
            </div>
          </GlassCard>
        );

      case 4:
        return (
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Select Routes to Test
            </h3>
            {state.uploadedSpec && (
              <div className="space-y-4">
                {Object.entries(state.uploadedSpec.paths || {}).map(
                  ([path, methods]) => (
                    <div
                      key={path}
                      className="border border-white/20 rounded-lg p-4"
                    >
                      <h4 className="text-white font-medium mb-3">{path}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(methods).map(([method, details]) => (
                          <label
                            key={`${path}-${method}`}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10"
                          >
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-blue-500 bg-transparent border-white/30 rounded"
                              defaultChecked
                            />
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                method === "get"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : method === "post"
                                  ? "bg-green-500/20 text-green-400"
                                  : method === "put"
                                  ? "bg-orange-500/20 text-orange-400"
                                  : method === "delete"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-gray-500/20 text-gray-400"
                              }`}
                            >
                              {method.toUpperCase()}
                            </span>
                            <span className="text-white/80 text-sm">
                              {details.summary || "No description"}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </GlassCard>
        );

      case 5:
        return (
          <div className="space-y-6">
            {!state.testResults && !state.isLoading && (
              <GlassCard className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Run Tests
                </h3>
                <p className="text-white/70 mb-6">
                  Click the button below to start testing your API endpoints
                </p>
                <Button size="lg" onClick={handleRunTests} className="group">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Run Complete Test Suite
                </Button>
              </GlassCard>
            )}

            {state.isLoading && (
              <GlassCard className="p-12">
                <LoadingSpinner
                  size="lg"
                  text="Running tests... This may take a few minutes"
                />
              </GlassCard>
            )}

            {state.testResults && (
              <div className="space-y-6">
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">
                      Test Results
                    </h3>
                    <Button variant="secondary" size="sm">
                      <Download className="w-4 h-4" />
                      Download Report
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-3xl font-bold text-white mb-1">
                        {state.testResults.summary.total}
                      </div>
                      <div className="text-white/60 text-sm">Total Tests</div>
                    </div>
                    <div className="text-center p-4 bg-green-500/20 rounded-lg">
                      <div className="text-3xl font-bold text-green-400 mb-1">
                        {state.testResults.summary.passed}
                      </div>
                      <div className="text-green-400/80 text-sm">Passed</div>
                    </div>
                    <div className="text-center p-4 bg-red-500/20 rounded-lg">
                      <div className="text-3xl font-bold text-red-400 mb-1">
                        {state.testResults.summary.failed}
                      </div>
                      <div className="text-red-400/80 text-sm">Failed</div>
                    </div>
                    <div className="text-center p-4 bg-blue-500/20 rounded-lg">
                      <div className="text-3xl font-bold text-blue-400 mb-1">
                        {state.testResults.summary.successRate}%
                      </div>
                      <div className="text-blue-400/80 text-sm">
                        Success Rate
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white mb-4">
                      Test Details
                    </h4>
                    {state.testResults.tests.map((test, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          test.status === "passed"
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-red-500/10 border-red-500/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                test.status === "passed"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {test.status.toUpperCase()}
                            </span>
                            <span className="text-white font-medium">
                              {test.route}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span>Status: {test.statusCode}</span>
                            <span>Time: {test.responseTime}ms</span>
                          </div>
                        </div>
                        {test.error && (
                          <p className="text-red-400 text-sm mt-2">
                            {test.error}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </GlassCard>
                {state.testResults && (
                  <div className="mt-8">
                    <ConfusionMatrix testResults={state.testResults} />
                  </div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen aurora-bg">
      <Header onNavigate={onNavigate} />

      <div className="pt-36 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      state.currentStep >= step.id
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "border-white/30 text-white/50"
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p
                      className={`text-sm font-medium ${
                        state.currentStep >= step.id
                          ? "text-white"
                          : "text-white/50"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-white/40">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-white/30 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">{renderStepContent()}</div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrevStep}
              disabled={state.currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {state.currentStep < 5 && (
              <Button
                onClick={handleNextStep}
                disabled={
                  (state.currentStep === 1 && !state.uploadedSpec) ||
                  (state.currentStep === 2 && !baseUrl)
                }
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTool;
