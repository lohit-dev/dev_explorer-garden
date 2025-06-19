import React from "react";
import { Copy, Check } from "lucide-react";

const CopiableRow = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };
  return (
    <div
      className="group flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-700/30 transition-all duration-200 cursor-pointer"
      onClick={handleCopy}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCopy();
      }}
    >
      <span className="text-sm text-slate-300 font-medium">{label}</span>
      <div className="flex items-center space-x-2">
        <span
          className="font-mono text-sm text-white max-w-[140px] truncate"
          title={value}
        >
          {value}
        </span>
        <button
          tabIndex={-1}
          className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-slate-600/50 transition-all duration-200 relative"
          aria-label={`Copy ${label}`}
          type="button"
        >
          {copied ? (
            <Check size={14} className="text-green-400" />
          ) : (
            <Copy size={14} className="text-slate-400 hover:text-white" />
          )}
          {copied && (
            <div className="absolute -top-8 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg">
              Copied!
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default CopiableRow;
