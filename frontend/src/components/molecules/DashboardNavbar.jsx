import { useState, useContext } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditAndCreateTransactionDialog from "@/components/transaction_components/EditAndCreateTransactionDialog";
import { AuthContext } from "@/context/AuthContext";
import { AppContext } from "@/context/AppContext";

const DashboardNavbar = ({ pageTitle, onMenuToggle }) => {
  const { user } = useContext(AuthContext);
  const { fetchTransactions } = useContext(AppContext);

  const isAdmin = user?.role === "admin";
  const isActive= user?.isActive;

  const [open, setOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);

  return (
    <>
      <header
        className="hidden sticky top-0 z-30 md:flex items-center justify-between h-16 px-4 md:px-6
        bg-zinc-900 border-b border-zinc-800"
      >
        {/* left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition"
          >
            <Menu size={20} className="text-white" />
          </button>

          <h1 className="text-lg font-medium text-white">{pageTitle}</h1>
        </div>

        {/* right */}
        <div className="flex gap-3 items-center">

          {/* only admin can see */}
          {isAdmin && isActive && (
            <Button 
            variant="secondary"
            className={"cursor-pointer"}
            onClick={() => {
              setSelectedTx(null); 
              setOpen(true);
            }}>
              Add Transaction
            </Button>
          )}

          
        </div>
      </header>

      {/* dialog  */}
      <EditAndCreateTransactionDialog
        open={open}
        onClose={() => setOpen(false)}
        editingTransaction={selectedTx}
        onSuccess={() => fetchTransactions()}
      />
    </>
  );
};

export default DashboardNavbar;