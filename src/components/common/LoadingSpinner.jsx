const LoadingSpinner = ({ size = "md", text = "", className = "" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div
        className={`${sizes[size]} border-2 border-white/20 border-t-primary-accent rounded-full animate-spin`}
      ></div>
      {text && <p className="text-white/70 text-sm font-medium">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
