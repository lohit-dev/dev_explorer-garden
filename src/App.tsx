import { useState, useEffect, useRef } from "react";
import { fetchOrderData } from "./services/network";
import TransactionDetails from "./components/TransactionDetails";
import SwapCard from "./components/SwapCard";
import { OrderData } from "./types";
import AdditionalData from "./components/AdditionalData";
import { formatDate } from "./utils";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<OrderData | null>(null);
  const [showMoreSend, setShowMoreSend] = useState(false);
  const [showMoreReceive, setShowMoreReceive] = useState(false);
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
        setShowMoreSend(false);
        setShowMoreReceive(false);
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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Search Modal */}
      {showSearch && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadein"
          onClick={handleOverlayClick}
        >
          <div className="bg-slate-800/95 rounded-2xl shadow-2xl p-0 w-full max-w-lg mx-auto flex flex-col items-center transition-transform duration-200 scale-95 animate-cmdkmodal">
            <div className="w-full flex flex-col items-center px-8 py-10">
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

      {/* Search Hint */}
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
        <div className="min-h-screen w-full flex justify-center bg-slate-900 overflow-auto">
          <div className="max-w-7xl w-full px-2 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Transaction Details + Additional Data */}
              <div className="space-y-4">
                <TransactionDetails
                  createOrder={searchResults.result.create_order}
                  createdAt={searchResults.result.created_at}
                  formatDate={formatDate}
                />
                <AdditionalData
                  additionalData={
                    searchResults.result.create_order.additional_data
                  }
                  showMore={showMoreAdditional}
                  setShowMore={setShowMoreAdditional}
                />
              </div>

              {/* Right Column - Send/Receive Cards */}
              <div className="space-y-4">
                <SwapCard
                  title="Send"
                  swap={searchResults.result.source_swap}
                  amount={searchResults.result.create_order.source_amount}
                  chain={searchResults.result.create_order.source_chain}
                  showMore={showMoreSend}
                  setShowMore={setShowMoreSend}
                  formatDate={formatDate}
                />
                <SwapCard
                  title="Receive"
                  swap={searchResults.result.destination_swap}
                  amount={searchResults.result.create_order.destination_amount}
                  chain={searchResults.result.create_order.destination_chain}
                  showMore={showMoreReceive}
                  setShowMore={setShowMoreReceive}
                  formatDate={formatDate}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
