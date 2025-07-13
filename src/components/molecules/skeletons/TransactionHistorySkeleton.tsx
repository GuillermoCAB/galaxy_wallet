export const TransactionHistorySkeleton = () => {
  return (
    <div className="w-full max-w-sm mt-4 animate-pulse">
      <h2 className="text-sm font-semibold text-gray-500 mb-2">
        Transaction History
      </h2>
      <div className="flex flex-col gap-2 max-h-48">
        <div className="bg-white/5 border border-white/10 rounded px-3 py-2">
          <div className="h-4 bg-gray-300/20 rounded w-1/2 mb-1" />
          <div className="h-3 bg-gray-300/10 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
};
