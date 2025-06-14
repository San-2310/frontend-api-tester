export const API_ENDPOINTS = {
  UPLOAD_SPEC: "/upload-spec",
  GENERATE_TESTCASES: "/generate-testcases",
  RUN_TESTCASES: "/run-testcases",
  TEST_RESULTS: "/test-results",
}

export const HTTP_METHODS = {
  GET: { color: "blue", label: "GET" },
  POST: { color: "green", label: "POST" },
  PUT: { color: "orange", label: "PUT" },
  DELETE: { color: "red", label: "DELETE" },
  PATCH: { color: "purple", label: "PATCH" },
  HEAD: { color: "gray", label: "HEAD" },
  OPTIONS: { color: "gray", label: "OPTIONS" },
}

export const TEST_STATUS = {
  PASSED: "passed",
  FAILED: "failed",
  SKIPPED: "skipped",
  RUNNING: "running",
}

export const SECURITY_SCHEMES = {
  API_KEY: "apiKey",
  HTTP: "http",
  OAUTH2: "oauth2",
  OPEN_ID_CONNECT: "openIdConnect",
}

export const THEME_COLORS = {
  DARK: {
    background: "from-slate-900 via-purple-900 to-slate-900",
    glass: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.1)",
    text: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.7)",
  },
  LIGHT: {
    background: "from-gray-50 via-blue-50 to-gray-50",
    glass: "rgba(255, 255, 255, 0.7)",
    border: "rgba(0, 0, 0, 0.1)",
    text: "#1f2937",
    textSecondary: "#6b7280",
  },
}

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
}

export const STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  USER_DATA: "userData",
  THEME: "theme",
  ACCENT_COLOR: "accentColor",
  APP_SETTINGS: "appSettings",
  TEST_SESSIONS: "testSessions",
}
