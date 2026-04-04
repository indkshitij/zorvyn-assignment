import { useContext, useEffect, useState, lazy, Suspense } from "react";
import { AppContext } from "@/context/AppContext";

import Sidebar from "@/components/molecules/Sidebar";
import SideComponentWrapper from "@/lib/SideComponentWrapper";
import DashboardNavbar from "@/components/molecules/DashboardNavbar";
import LoaderFallback from "@/components/atom/LoaderFallback";

const FilterTransaction = lazy(
  () => import("@/components/transaction_components/FilterTranscation"),
);
const TransactionTable = lazy(
  () => import("@/components/transaction_components/TransactionTable"),
);
import EditAndCreateTransactionDialog from "@/components/transaction_components/EditAndCreateTransactionDialog";
import DeleteTransactionModal from "@/components/transaction_components/DeleteTransactionModal";

export default function Transactions() {
  const { transactions, loading, fetchTransactions, deleteTransaction } =
    useContext(AppContext);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEditTx, setSelectedEditTx] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDeleteTx, setSelectedDeleteTx] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getTxId = (tx) => tx?._id || tx?.id;

  const handleDelete = async () => {
    if (!selectedDeleteTx || deleting) return;

    const id = getTxId(selectedDeleteTx);
    if (!id) return;

    try {
      setDeleting(true);

      await deleteTransaction(id);

      setDeleteModalOpen(false);
      setSelectedDeleteTx(null);

      await fetchTransactions();
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 md:ml-60">
        <DashboardNavbar pageTitle="Transactions" />

        <SideComponentWrapper>
          <div className="space-y-6">
            {/* Filters */}
            <Suspense fallback={<LoaderFallback />}>
              <FilterTransaction />
            </Suspense>

            {/* Table */}
            <Suspense fallback={<LoaderFallback />}>
              <TransactionTable
                transactions={transactions || []}
                loading={loading}
                onEdit={(tx) => {
                  if (!tx) return;
                  setSelectedEditTx(tx);
                  setOpenEditModal(true);
                }}
                onDelete={(tx) => {
                  if (!tx) return;
                  setSelectedDeleteTx(tx);
                  setDeleteModalOpen(true);
                }}
              />
            </Suspense>
          </div>
        </SideComponentWrapper>
      </main>

      {/* EDIT MODAL */}
      <EditAndCreateTransactionDialog
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedEditTx(null);
        }}
        editingTransaction={selectedEditTx}
        onSuccess={async () => {
          setOpenEditModal(false);
          setSelectedEditTx(null);
          await fetchTransactions();
        }}
      />

      {/* DELETE MODAL */}
      <DeleteTransactionModal
        open={deleteModalOpen}
        onClose={() => {
          if (deleting) return;
          setDeleteModalOpen(false);
          setSelectedDeleteTx(null);
        }}
        transaction={selectedDeleteTx}
        loading={deleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
