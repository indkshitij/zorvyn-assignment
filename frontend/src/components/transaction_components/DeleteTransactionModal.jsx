import { Trash2 } from "lucide-react";

const DeleteTransactionModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  transaction,
}) => {
  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose?.();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90%] max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-2xl animate-in fade-in zoom-in-95"
      >
        {/* header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <Trash2 className="text-red-400" size={18} />
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">
              Delete Transaction
            </h3>
            <p className="text-xs text-zinc-500">
              This action cannot be undone
            </p>
          </div>
        </div>

        {/* content */}
        <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="text-white font-medium">
            {transaction?.note || "this transaction"}
          </span>
          ? This will permanently remove it from your records.
        </p>

        {/* actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2.5 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-2.5 text-sm bg-red-600 hover:bg-red-500 rounded-lg transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransactionModal;
