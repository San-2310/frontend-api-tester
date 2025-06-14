import apiClient from "./apiClient"

export const testingService = {
  // Upload OpenAPI specification
  uploadSpec: async (file, baseUrl) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("base_url", baseUrl)

    const response = await apiClient.post("/upload-spec", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  },

  // Generate test cases
  generateTestCases: async (spec, baseUrl) => {
    const response = await apiClient.post("/generate-testcases", {
      spec,
      base_url: baseUrl,
    })

    return response.data
  },

  // Run test cases
  runTestCases: async (jsonPath, selectedRoutes, securityConfig) => {
    const response = await apiClient.post("/run-testcases", {
      json_path: jsonPath,
      selected_routes: selectedRoutes,
      security_config: securityConfig,
    })

    return response.data
  },

  // Get test results (for streaming)
  getTestResults: async (sessionId) => {
    const response = await apiClient.get(`/test-results/${sessionId}`)
    return response.data
  },
}

export default testingService
