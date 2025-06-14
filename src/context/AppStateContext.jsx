"use client"

import { createContext, useContext, useReducer } from "react"

const AppStateContext = createContext()

export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider")
  }
  return context
}

const getInitialSessions = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("testSessions") || "[]")
  }
  return []
}

const initialState = {
  currentStep: 1,
  uploadedSpec: null,
  baseUrl: "",
  securityConfig: {},
  selectedRoutes: [],
  testResults: null,
  testSessions: getInitialSessions(),
  isLoading: false,
  error: null,
}

const appStateReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload }

    case "SET_UPLOADED_SPEC":
      return { ...state, uploadedSpec: action.payload }

    case "SET_BASE_URL":
      return { ...state, baseUrl: action.payload }

    case "SET_SECURITY_CONFIG":
      return { ...state, securityConfig: action.payload }

    case "SET_SELECTED_ROUTES":
      return { ...state, selectedRoutes: action.payload }

    case "SET_TEST_RESULTS":
      return { ...state, testResults: action.payload }

    case "ADD_TEST_SESSION":
      const newSessions = [...state.testSessions, action.payload]
      if (typeof window !== "undefined") {
        localStorage.setItem("testSessions", JSON.stringify(newSessions))
      }
      return { ...state, testSessions: newSessions }

    case "SET_LOADING":
      return { ...state, isLoading: action.payload }

    case "SET_ERROR":
      return { ...state, error: action.payload }

    case "RESET_STATE":
      return { ...initialState, testSessions: state.testSessions }

    default:
      return state
  }
}

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState)

  const actions = {
    setCurrentStep: (step) => dispatch({ type: "SET_CURRENT_STEP", payload: step }),
    setUploadedSpec: (spec) => dispatch({ type: "SET_UPLOADED_SPEC", payload: spec }),
    setBaseUrl: (url) => dispatch({ type: "SET_BASE_URL", payload: url }),
    setSecurityConfig: (config) => dispatch({ type: "SET_SECURITY_CONFIG", payload: config }),
    setSelectedRoutes: (routes) => dispatch({ type: "SET_SELECTED_ROUTES", payload: routes }),
    setTestResults: (results) => dispatch({ type: "SET_TEST_RESULTS", payload: results }),
    addTestSession: (session) => dispatch({ type: "ADD_TEST_SESSION", payload: session }),
    setLoading: (loading) => dispatch({ type: "SET_LOADING", payload: loading }),
    setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
    resetState: () => dispatch({ type: "RESET_STATE" }),
  }

  return <AppStateContext.Provider value={{ state, actions }}>{children}</AppStateContext.Provider>
}
