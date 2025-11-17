// src/components/Toast.tsx

import type { FC } from "react";

export type ToastVariant = "info" | "success" | "error";

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
}

const Toast: FC<ToastProps> = ({ message, variant = "info" }: ToastProps) => {
  const baseClasses: string =
    "px-4 py-2 rounded-lg border shadow-lg text-sm bg-slate-900/80 backdrop-blur-sm";

  const variantClasses: string = (() => {
    switch (variant) {
      case "success":
        return "border-emerald-400 text-emerald-50";
      case "error":
        return "border-rose-400 text-rose-50";
      case "info":
      default:
        return "border-slate-500 text-slate-50";
    }
  })();

  const combinedClasses: string = `${baseClasses} ${variantClasses}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className={combinedClasses}>{message}</div>
    </div>
  );
};

export default Toast;
