"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import GlassCard from "./GlassCard";

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <GlassCard
        className={`relative w-full ${sizes[size]} max-h-[90vh] overflow-y-auto fade-in`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold theme-text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 theme-text-secondary" />
          </button>
        </div>
        {children}
      </GlassCard>
    </div>
  );
};

export default Modal;
