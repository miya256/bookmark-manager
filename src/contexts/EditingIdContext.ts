import { createContext, useContext } from "react";

type EditingIdContextType = {
  editingId: string | null;
  setEditingId: (id: string | null) => void;
};

export const EditingIdContext = createContext<EditingIdContextType | null>(null);

export const useEditingId = () => {
  const context = useContext(EditingIdContext);

  if (!context) {
    throw new Error("useEditingContext must be used inside EditingProvider");
  }

  return context;
};