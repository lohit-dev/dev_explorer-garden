import { useState, useEffect, useRef } from "react";
import { fetchOrderData } from "./services/network";
import OrderOverview from "./components/OrderOverview";
import SwapDetails from "./components/SwapDetails";
import AdditionalInfo from "./components/AdditionalInfo";
import { OrderData } from "./types";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<OrderData | null>(null);
  const [showMoreOverview, setShowMoreOverview] = useState(false);
  const [showMoreSource, setShowMoreSource] = useState(false);
  const [showMoreDest, setShowMoreDest] = useState(false);
  const [showMoreAdditional, setShowMoreAdditional] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isValidOrderId = searchQuery.length === 64;

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowSearch(true);
        setSearchResults(null);
        setShowMoreOverview(false);
        setShowMoreSource(false);
        setShowMoreDest(false);
        setShowMoreAdditional(false);
        setSearchQuery("");
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === "Escape") {
        setShowSearch(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Hide modal and reset searchQuery on close
  const closeModal = () => {
    setShowSearch(false);
    setSearchQuery("");
  };

  const handleSearch = async () => {
    if (!isValidOrderId) return;
    setIsSearching(true);
    try {
      const data = await fetchOrderData(searchQuery.trim());
      setSearchResults(data);
      setShowSearch(false);
    } catch {
      setSearchResults(null);
    }
    setIsSearching(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getChainColor = (chain: string) => {
    switch (chain.toLowerCase()) {
      case "arbitrum":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25";
      case "bitcoin":
        return "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/25";
    }
  };

  // Modal overlay click closes modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Zen/CMDK Search Modal */}
      {showSearch && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadein"
          onClick={handleOverlayClick}
        >
          <div className="bg-slate-800/95 rounded-2xl shadow-2xl p-0 w-full max-w-lg mx-auto flex flex-col items-center transition-transform duration-200 scale-95 animate-cmdkmodal">
            <div className="w-full flex flex-col items-center px-8 py-10">
              <span
                className="text-4xl mb-6 select-none"
                aria-label="cherry blossom"
              >
                🌸
              </span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Paste or type Order ID…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                maxLength={64}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isValidOrderId && !isSearching) {
                    handleSearch();
                  }
                  if (e.key === "Escape") {
                    closeModal();
                  }
                }}
                className="w-full text-center text-lg px-6 py-4 bg-slate-900/80 border border-slate-700/60 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200 text-white placeholder-slate-400 shadow-md"
              />
              {!isValidOrderId && searchQuery.length > 0 && (
                <div className="text-red-400 text-sm mt-3">
                  Order ID must be exactly 64 characters.
                </div>
              )}
              {isSearching && (
                <div className="mt-4 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Shortcut hint (centered) */}
      {!showSearch && !searchResults && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="text-slate-300 text-lg bg-slate-800/90 px-6 py-4 rounded-2xl shadow-2xl select-none flex items-center space-x-3 border border-slate-700/60">
            <span>Press</span>
            <kbd className="px-2 py-1 bg-slate-700 rounded text-xl font-mono">
              {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}
            </kbd>
            <span className="text-xl font-bold">+</span>
            <kbd className="px-2 py-1 bg-slate-700 rounded text-xl font-mono">
              K
            </kbd>
            <span>to search</span>
          </div>
        </div>
      )}

      {/* Results Section */}
      {!showSearch && searchResults && (
        <div className="max-w-5xl mx-auto py-12 px-4">
          <OrderOverview
            createOrder={searchResults.result.create_order}
            createdAt={searchResults.result.created_at}
            showMore={showMoreOverview}
            setShowMore={setShowMoreOverview}
            formatDate={formatDate}
          />
          <div className="h-8" />
          <SwapDetails
            swap={searchResults.result.source_swap}
            chainColor={getChainColor(searchResults.result.source_swap.chain)}
            title={`Source Swap (${searchResults.result.source_swap.chain})`}
            showMore={showMoreSource}
            setShowMore={setShowMoreSource}
            formatDate={formatDate}
          />
          <div className="h-8" />
          <SwapDetails
            swap={searchResults.result.destination_swap}
            chainColor={getChainColor(
              searchResults.result.destination_swap.chain
            )}
            title={`Destination Swap (${searchResults.result.destination_swap.chain})`}
            showMore={showMoreDest}
            setShowMore={setShowMoreDest}
            formatDate={formatDate}
          />
          <div className="h-8" />
          <AdditionalInfo
            additionalData={searchResults.result.create_order.additional_data}
            showMore={showMoreAdditional}
            setShowMore={setShowMoreAdditional}
          />
        </div>
      )}
      {/* Animations */}
      <style>{`
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadein {
          animation: fadein 0.2s;
        }
        @keyframes cmdkmodal {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-cmdkmodal {
          animation: cmdkmodal 0.18s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
}

export default App;
