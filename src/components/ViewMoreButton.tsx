import React from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

interface ViewMoreButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  count: number;
}

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({
  isExpanded,
  onClick,
  count,
}) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 rounded-xl border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 text-blue-300 hover:text-blue-200"
  >
    {isExpanded ? <EyeOff size={16} /> : <Eye size={16} />}
    <span className="text-sm font-medium">
      {isExpanded ? "Show Less" : `View More (${count} more fields)`}
    </span>
    <ChevronDown
      size={16}
      className={`transition-transform duration-300 ${
        isExpanded ? "rotate-180" : ""
      }`}
    />
  </button>
);

export default ViewMoreButton;
