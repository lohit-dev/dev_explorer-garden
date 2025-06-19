import { useState } from "react";
import { Search } from "lucide-react";
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
  const isValidOrderId = searchQuery.length === 64;

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      try {
        const data = await fetchOrderData(searchQuery.trim());
        setSearchResults(data);
      } catch {
        setSearchResults(null);
      }
      setIsSearching(false);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  🌸
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Garden Explorer
                </h1>
                <p className="text-slate-400 mt-1">
                  Developer-friendly transaction explorer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 mb-12 shadow-2xl shadow-slate-900/50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Enter Order ID here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                maxLength={64}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isValidOrderId && !isSearching) {
                    handleSearch();
                  }
                }}
                className="w-full px-6 py-4 bg-slate-900/50 border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm"
              />
              {!isValidOrderId && searchQuery.length > 0 && (
                <div className="text-red-400 text-sm mt-2">
                  Order ID must be exactly 64 characters.
                </div>
              )}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !isValidOrderId}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-3 font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Search size={20} />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {searchResults && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <OrderOverview
              createOrder={searchResults.result.create_order}
              createdAt={searchResults.result.created_at}
              showMore={showMoreOverview}
              setShowMore={setShowMoreOverview}
              formatDate={formatDate}
            />
            <SwapDetails
              swap={searchResults.result.source_swap}
              chainColor={getChainColor(searchResults.result.source_swap.chain)}
              title={`Source Swap (${searchResults.result.source_swap.chain})`}
              showMore={showMoreSource}
              setShowMore={setShowMoreSource}
              formatDate={formatDate}
            />
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
            <AdditionalInfo
              additionalData={searchResults.result.create_order.additional_data}
              showMore={showMoreAdditional}
              setShowMore={setShowMoreAdditional}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
