"use client"

import { useCallback, useState } from "react"
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react"
import GlassCard from "../common/GlassCard"

const FileUpload = ({ onFileUpload, acceptedTypes = ".json,.yaml,.yml" }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    const validTypes = ["application/json", "text/yaml", "application/x-yaml"]
    const validExtensions = [".json", ".yaml", ".yml"]

    const isValidType =
      validTypes.includes(file.type) || validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))

    if (!isValidType) {
      setUploadStatus({
        type: "error",
        message: "Please upload a valid JSON or YAML file",
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setUploadStatus({
        type: "error",
        message: "File size must be less than 10MB",
      })
      return
    }

    setUploadStatus({
      type: "success",
      message: `File "${file.name}" uploaded successfully`,
    })

    onFileUpload(file)
  }

  return (
    <GlassCard className="p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Upload OpenAPI Specification</h3>
        <p className="text-white/70">Upload your OpenAPI specification file (JSON or YAML format)</p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
          dragActive ? "border-blue-400 bg-blue-400/10" : "border-white/30 hover:border-white/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={acceptedTypes}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-blue-400" />
          </div>

          <div>
            <p className="text-lg font-medium text-white mb-2">
              Drop your OpenAPI file here, or <span className="text-blue-400 underline">browse</span>
            </p>
            <p className="text-sm text-white/60">Supports JSON and YAML formats (max 10MB)</p>
          </div>
        </div>
      </div>

      {uploadStatus && (
        <div
          className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
            uploadStatus.type === "success"
              ? "bg-green-500/20 border border-green-500/30"
              : "bg-red-500/20 border border-red-500/30"
          }`}
        >
          {uploadStatus.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400" />
          )}
          <p className={`text-sm ${uploadStatus.type === "success" ? "text-green-400" : "text-red-400"}`}>
            {uploadStatus.message}
          </p>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
          <File className="w-5 h-5 text-blue-400" />
          <div>
            <p className="text-sm font-medium text-white">JSON Format</p>
            <p className="text-xs text-white/60">OpenAPI 3.0+ specification</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
          <File className="w-5 h-5 text-green-400" />
          <div>
            <p className="text-sm font-medium text-white">YAML Format</p>
            <p className="text-xs text-white/60">OpenAPI 3.0+ specification</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
          <CheckCircle className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-sm font-medium text-white">Auto-Validation</p>
            <p className="text-xs text-white/60">Instant format checking</p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

export default FileUpload
