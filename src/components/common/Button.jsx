"use client"
import { Loader2 } from "lucide-react"

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses = "glass-button font-medium transition-all duration-300 flex items-center justify-center gap-2"

  const variants = {
    primary: "text-white hover:text-white glow-effect",
    secondary: "text-gray-300 hover:text-white",
    success: "text-green-400 hover:text-green-300 border-green-500/30 hover:border-green-400",
    danger: "text-red-400 hover:text-red-300 border-red-500/30 hover:border-red-400",
    ghost: "border-transparent hover:border-white/20 text-gray-300 hover:text-white",
  }

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  }

  const isDisabled = disabled || loading

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}

export default Button
