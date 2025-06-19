import React from "react";
import DataField from "./DataField";
import ViewMoreButton from "./ViewMoreButton";
import Section from "./Section";
import { Hash } from "lucide-react";

interface AdditionalInfoProps {
  additionalData: any;
  showMore: boolean;
  setShowMore: (v: boolean) => void;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  additionalData,
  showMore,
  setShowMore,
}) => (
  <Section
    title="Additional Information"
    icon={<Hash size={20} className="text-white" />}
    gradient="bg-gradient-to-r from-purple-600/60 to-pink-600/60"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DataField label="Strategy ID" value={additionalData.strategy_id} />
      <DataField
        label="Bitcoin Recipient"
        value={additionalData.bitcoin_optional_recipient}
      />
      <DataField
        label="Transaction Hash"
        value={additionalData.tx_hash}
        icon={<Hash size={16} />}
      />
      <DataField
        label="Is Blacklisted"
        value={additionalData.is_blacklisted.toString()}
      />
    </div>
    <div className="flex justify-center pt-4">
      <ViewMoreButton
        isExpanded={showMore}
        onClick={() => setShowMore(!showMore)}
        count={4}
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
            label="Input Token Price"
            value={additionalData.input_token_price.toString()}
          />
          <DataField
            label="Output Token Price"
            value={additionalData.output_token_price.toString()}
          />
          <DataField
            label="Deadline"
            value={additionalData.deadline.toString()}
          />
          <DataField label="Signature" value={additionalData.sig} />
        </div>
      </div>
    </div>
  </Section>
);

export default AdditionalInfo;
