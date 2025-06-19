import React from "react";
import DataField from "./DataField";
import ViewMoreButton from "./ViewMoreButton";
import Section from "./Section";
import { Hash, Coins } from "lucide-react";

interface SwapDetailsProps {
  swap: any;
  chainColor: string;
  title: string;
  showMore: boolean;
  setShowMore: (v: boolean) => void;
  formatDate: (dateString: string) => string;
}

const SwapDetails: React.FC<SwapDetailsProps> = ({
  swap,
  chainColor,
  title,
  showMore,
  setShowMore,
  formatDate,
}) => (
  <Section
    title={title}
    icon={
      <span
        className={`px-3 py-1 rounded-xl text-xs font-medium ${chainColor}`}
      >
        {swap.chain}
      </span>
    }
    gradient={chainColor}
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DataField
        label="Swap ID"
        value={swap.swap_id}
        icon={<Hash size={16} />}
      />
      <DataField label="Asset" value={swap.asset} />
      <DataField
        label="Amount"
        value={swap.amount}
        icon={<Coins size={16} />}
      />
      <DataField
        label="Filled Amount"
        value={swap.filled_amount}
        icon={<Coins size={16} />}
      />
      <DataField
        label="Initiate Tx Hash"
        value={swap.initiate_tx_hash}
        icon={<Hash size={16} />}
      />
      <DataField
        label="Redeem Tx Hash"
        value={swap.redeem_tx_hash}
        icon={<Hash size={16} />}
      />
    </div>
    <div className="flex justify-center pt-4">
      <ViewMoreButton
        isExpanded={showMore}
        onClick={() => setShowMore(!showMore)}
        count={10}
      />
    </div>
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden ${
        showMore ? "max-h-[2000px] opacity-100 mt-6" : "max-h-0 opacity-0"
      }`}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataField label="Initiator" value={swap.initiator} />
          <DataField label="Redeemer" value={swap.redeemer} />
          <DataField label="Timelock" value={swap.timelock.toString()} />
          <DataField
            label="Required Confirmations"
            value={swap.required_confirmations.toString()}
          />
          <DataField
            label="Current Confirmations"
            value={swap.current_confirmations.toString()}
          />
          <DataField label="Secret" value={swap.secret} />
          <DataField
            label="Initiate Block Number"
            value={swap.initiate_block_number}
          />
          <DataField
            label="Redeem Block Number"
            value={swap.redeem_block_number}
          />
          <DataField label="Created At" value={formatDate(swap.created_at)} />
          <DataField label="Updated At" value={formatDate(swap.updated_at)} />
        </div>
      </div>
    </div>
  </Section>
);

export default SwapDetails;
