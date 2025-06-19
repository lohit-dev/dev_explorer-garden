import React, { useState } from "react";

interface DataFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const DataField: React.FC<DataFieldProps> = ({ label, value, icon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group relative bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            {icon && <div className="text-slate-400">{icon}</div>}
            <span className="text-sm font-medium text-slate-300">{label}</span>
          </div>
          <div
            className="font-mono text-sm text-white break-all leading-relaxed bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 cursor-pointer select-all relative"
            title={copied ? "Copied!" : "Click to copy"}
            onClick={handleCopy}
          >
            {value}
            {copied && (
              <span className="absolute right-2 top-2 text-xs text-green-400">
                Copied!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataField;
