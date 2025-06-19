import React from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { OrderData } from "../types";
import { getChainColor } from "../utils";
import CopiableRow from "./CopiableRow";

interface SwapCardProps {
  title: string;
  swap:
    | OrderData["result"]["source_swap"]
    | OrderData["result"]["destination_swap"];
  amount: string;
  chain: string;
  showMore: boolean;
  setShowMore: (show: boolean) => void;
  formatDate: (dateString: string) => string;
}

const SwapCard: React.FC<SwapCardProps> = ({
  title,
  swap,
  amount,
  chain,
  showMore,
  setShowMore,
  formatDate,
}) => {
  return (
    <div className="relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 rounded-2xl blur-sm"></div>

      <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-700/70 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-600/40 shadow-2xl overflow-hidden">
        {/* Subtle animated border */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent animate-pulse rounded-2xl"></div>

        <div className="relative p-6 space-y-4">
          {/* Header with enhanced styling */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${getChainColor(
                  chain
                )} shadow-lg animate-pulse`}
              ></div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {title}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                {amount}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getChainColor(
                  chain
                )} text-white shadow-lg`}
              >
                {chain.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Essential info with modern styling */}
          <div className="bg-slate-900/30 rounded-xl border border-slate-600/20 p-4 space-y-2 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-1">
              <CopiableRow label="Swap id" value={swap.swap_id} />
              <CopiableRow
                label="Price"
                value={`${swap.filled_amount || "No filled amount"}`}
              />
              <CopiableRow label="Initiator" value={swap.initiator} />
              <CopiableRow label="Initiate Tx" value={swap.initiate_tx_hash} />
              <CopiableRow label="Redeemer" value={swap.redeemer} />
              <CopiableRow label="Redeem Tx" value={swap.redeem_tx_hash} />
            </div>
          </div>

          {/* Enhanced View More Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowMore(!showMore)}
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-700/50 hover:bg-slate-600/60 border border-slate-600/40 hover:border-slate-500/60 text-slate-300 hover:text-white transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-sm font-medium">
                {showMore ? "Show Less" : "View Details"}
              </span>
              <div className="transform transition-transform duration-300 group-hover:scale-110">
                {showMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>
          </div>

          {/* Enhanced Expanded Details */}
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
                  <ExternalLink size={14} className="mr-2" />
                  Transaction Details
                </h4>
              </div>
              <div className="grid gap-1">
                <CopiableRow label="Asset" value={swap.asset} />
                <CopiableRow label="Amount" value={swap.amount} />
                <CopiableRow label="Filled Amount" value={swap.filled_amount} />
                <CopiableRow
                  label="Timelock"
                  value={swap.timelock?.toString()}
                />
                <CopiableRow
                  label="Required Confirmations"
                  value={swap.required_confirmations?.toString()}
                />
                <CopiableRow
                  label="Current Confirmations"
                  value={swap.current_confirmations?.toString()}
                />
                <CopiableRow label="Secret" value={swap.secret} />
                <CopiableRow
                  label="Initiate Block"
                  value={swap.initiate_block_number}
                />
                <CopiableRow
                  label="Redeem Block"
                  value={swap.redeem_block_number}
                />
                <CopiableRow
                  label="Last Updated"
                  value={formatDate(swap.updated_at)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapCard;
