import React from "react";
import { ArrowRight } from "lucide-react";
import { OrderData } from "../types";
import { getChainColor } from "../utils";
import CopiableRow from "./CopiableRow";

interface TransactionDetailsProps {
  createOrder: OrderData["result"]["create_order"];
  createdAt: string;
  formatDate: (dateString: string) => string;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  createOrder,
  createdAt,
  formatDate,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 rounded-2xl blur-sm"></div>
      <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-700/70 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-600/40 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent animate-pulse rounded-2xl"></div>
        <div className="relative p-6 space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg animate-pulse"></div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Transaction Details
                </h3>
              </div>
            </div>

            <div className="bg-slate-900/30 rounded-xl border border-slate-600/20 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                      {createOrder.source_amount}
                    </div>
                    <div
                      className={`mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getChainColor(
                        createOrder.source_chain
                      )} text-white shadow-lg`}
                    >
                      {createOrder.source_chain.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center px-4">
                  <ArrowRight size={24} className="text-slate-400" />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                      {createOrder.destination_amount}
                    </div>
                    <div
                      className={`mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getChainColor(
                        createOrder.destination_chain
                      )} text-white shadow-lg`}
                    >
                      {createOrder.destination_chain.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/30 rounded-xl border border-slate-600/20 p-4 space-y-2 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-1">
              <CopiableRow label="Order ID" value={createOrder.create_id} />
              <CopiableRow label="Created At" value={formatDate(createdAt)} />
              <CopiableRow label="Fees" value={createOrder.fee} />
              <CopiableRow
                label="Refund Address"
                value={createOrder.initiator_source_address}
              />
              <CopiableRow
                label="Destination Address"
                value={createOrder.initiator_destination_address}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
