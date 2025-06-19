export const getChainColor = (chain: string) => {
    const colors = {
        bitcoin: "from-orange-500 to-yellow-500",
        ethereum: "from-blue-500 to-purple-500",
        base: "from-blue-400 to-blue-600",
        arbitrum: "from-blue-600 to-cyan-500",
        berachain: "from-amber-500 to-orange-600",
        corn: "from-yellow-400 to-yellow-600",
        unichain: "from-pink-500 to-purple-600",
        starknet: "from-indigo-500 to-purple-700",
        default: "from-slate-500 to-slate-600",
    };

    return colors[chain.toLowerCase() as keyof typeof colors] || colors.default;
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};