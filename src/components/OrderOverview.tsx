import React from "react";
import DataField from "./DataField";
import ViewMoreButton from "./ViewMoreButton";
import Section from "./Section";
import { Hash, User, Coins, Clock } from "lucide-react";

interface OrderOverviewProps {
  createOrder: any;
  createdAt: string;
  showMore: boolean;
  setShowMore: (v: boolean) => void;
  formatDate: (dateString: string) => string;
}

const OrderOverview: React.FC<OrderOverviewProps> = ({
  createOrder,
  createdAt,
  showMore,
  setShowMore,
  formatDate,
}) => (
  <Section
    title="Order Overview"
    icon={<Hash size={20} className="text-white" />}
    gradient="bg-gradient-to-r from-blue-600/80 to-purple-600/80"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DataField
        label="Order ID"
        value={createOrder.create_id}
        icon={<Hash size={16} />}
      />
      <DataField
        label="User ID"
        value={createOrder.user_id}
        icon={<User size={16} />}
      />
    </div>
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center space-x-6 bg-gradient-to-r from-slate-800/50 to-slate-700/30 rounded-3xl p-6 border border-slate-600/30 backdrop-blur-sm">
        <div className="text-center">
          <span className="px-4 py-2 rounded-2xl text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25">
            {createOrder.source_chain}
          </span>
          <div className="mt-3 text-2xl font-bold text-white">
            {createOrder.source_amount}
          </div>
          <div className="text-sm text-slate-400">Source Amount</div>
        </div>
        <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl">
          <span className="text-blue-400">→</span>
        </div>
        <div className="text-center">
          <span className="px-4 py-2 rounded-2xl text-sm font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25">
            {createOrder.destination_chain}
          </span>
          <div className="mt-3 text-2xl font-bold text-white">
            {createOrder.destination_amount}
          </div>
          <div className="text-sm text-slate-400">Destination Amount</div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DataField
        label="Source Initiator Address"
        value={createOrder.initiator_source_address}
        icon={<User size={16} />}
      />
      <DataField
        label="Destination Redeemer Address"
        value={createOrder.initiator_destination_address}
        icon={<User size={16} />}
      />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <DataField
        label="Fee"
        value={createOrder.fee}
        icon={<Coins size={16} />}
      />
      <DataField
        label="Created At"
        value={formatDate(createdAt)}
        icon={<Clock size={16} />}
      />
      <DataField
        label="Secret Hash"
        value={createOrder.secret_hash}
        icon={<Hash size={16} />}
      />
    </div>
    <div className="flex justify-center pt-4">
      <ViewMoreButton
        isExpanded={showMore}
        onClick={() => setShowMore(!showMore)}
        count={8}
      />
    </div>
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden ${
        showMore ? "max-h-[2000px] opacity-100 mt-6" : "max-h-0 opacity-0"
      }`}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataField
            label="Block Number"
            value={createOrder.block_number}
            icon={<Hash size={16} />}
          />
          <DataField
            label="Nonce"
            value={createOrder.nonce}
            icon={<Hash size={16} />}
          />
          <DataField label="Source Asset" value={createOrder.source_asset} />
          <DataField
            label="Destination Asset"
            value={createOrder.destination_asset}
          />
          <DataField
            label="Initiator Source Address"
            value={createOrder.initiator_source_address}
          />
          <DataField
            label="Initiator Destination Address"
            value={createOrder.initiator_destination_address}
          />
          <DataField label="Timelock" value={createOrder.timelock.toString()} />
          <DataField
            label="Min Destination Confirmations"
            value={createOrder.min_destination_confirmations.toString()}
          />
        </div>
      </div>
    </div>
  </Section>
);

export default OrderOverview;
