import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const Toast = () => {
  const { toast } = useContext(AppContext);

  if (!toast) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-accent-green text-bg-primary px-4 py-3 rounded-lg text-sm font-medium z-50 max-w-xs text-center">
      {toast}
    </div>
  );
};
