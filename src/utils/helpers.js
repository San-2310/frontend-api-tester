export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds.toFixed(1)}s`
}

export const getSuccessRateColor = (rate) => {
  if (rate >= 90) return "text-green-400"
  if (rate >= 70) return "text-yellow-400"
  return "text-red-400"
}

export const parseOpenAPISpec = (spec) => {
  try {
    const parsed = typeof spec === "string" ? JSON.parse(spec) : spec

    return {
      info: parsed.info || {},
      servers: parsed.servers || [],
      paths: parsed.paths || {},
      components: parsed.components || {},
      security: parsed.security || [],
      securitySchemes: parsed.components?.securitySchemes || {},
    }
  } catch (error) {
    throw new Error("Invalid OpenAPI specification format")
  }
}

export const extractRoutesFromSpec = (spec) => {
  const routes = []
  const paths = spec.paths || {}

  Object.entries(paths).forEach(([path, methods]) => {
    Object.entries(methods).forEach(([method, details]) => {
      if (["get", "post", "put", "delete", "patch", "head", "options"].includes(method.toLowerCase())) {
        routes.push({
          path,
          method: method.toUpperCase(),
          summary: details.summary || "",
          description: details.description || "",
          parameters: details.parameters || [],
          requestBody: details.requestBody || null,
          responses: details.responses || {},
          security: details.security || spec.security || [],
        })
      }
    })
  })

  return routes
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea")
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand("copy")
      return true
    } catch (err) {
      return false
    } finally {
      document.body.removeChild(textArea)
    }
  }
}

export const downloadFile = (content, filename, contentType = "application/json") => {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
