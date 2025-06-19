import React from "react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { OrderData } from "../types";

interface AdditionalDataProps {
  additionalData: OrderData["result"]["create_order"]["additional_data"];
  showMore: boolean;
  setShowMore: (show: boolean) => void;
}

const AdditionalData: React.FC<AdditionalDataProps> = ({
  additionalData,
  showMore,
  setShowMore,
}) => {
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

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 rounded-2xl blur-sm"></div>
      <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-700/70 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-600/40 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent animate-pulse rounded-2xl"></div>
        <div className="relative p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg animate-pulse"></div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Additional Information
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 shadow-lg backdrop-blur-sm">
                METADATA
              </span>
            </div>
          </div>

          <div className="bg-slate-900/30 rounded-xl border border-slate-600/20 p-4 space-y-2 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-1">
              <CopiableRow
                label="Strategy ID"
                value={additionalData.strategy_id}
              />
              <CopiableRow
                label="Bitcoin Recipient"
                value={additionalData.bitcoin_optional_recipient}
              />
              <CopiableRow
                label="Blacklist Status"
                value={
                  additionalData.is_blacklisted ? "Blacklisted" : "Approved"
                }
              />
              <CopiableRow
                label="Transaction Hash"
                value={additionalData.tx_hash}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setShowMore(!showMore)}
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-700/50 hover:bg-purple-600/60 border border-purple-600/40 hover:border-purple-500/60 text-purple-200 hover:text-white transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-sm font-medium">
                {showMore ? "Show Less" : "View Details"}
              </span>
              <div className="transform transition-transform duration-300 group-hover:scale-110">
                {showMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showMore
                ? "max-h-[600px] opacity-100 transform translate-y-0"
                : "max-h-0 opacity-0 transform -translate-y-4"
            }`}
          >
            <div className="bg-slate-900/40 rounded-xl border border-slate-600/20 p-4 space-y-1 backdrop-blur-sm mt-4">
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-slate-200 mb-2 flex items-center">
                  Extended Metadata
                </h4>
              </div>
              <div className="grid gap-1">
                <CopiableRow
                  label="Input Token Price"
                  value={additionalData.input_token_price.toString()}
                />
                <CopiableRow
                  label="Output Token Price"
                  value={additionalData.output_token_price.toString()}
                />
                <CopiableRow
                  label="Deadline"
                  value={new Date(
                    additionalData.deadline * 1000
                  ).toLocaleString()}
                />
                <CopiableRow label="Signature" value={additionalData.sig} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalData;
