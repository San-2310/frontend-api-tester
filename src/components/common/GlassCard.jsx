"use client"

const GlassCard = ({ children, className = "", hover = true, padding = "p-6", onClick, ...props }) => {
  return (
    <div
      className={`glass-card ${padding} ${hover ? "hover:glass-card" : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default GlassCard
