import { useContext } from "react";
import { ToastsContext } from "contexts/ToastsContext/Provider";

const useToast = () => {
  const toastContext = useContext(ToastsContext);

  if (toastContext === undefined) {
    throw new Error("Toasts context undefined");
  }

  return toastContext;
};

export default useToast;
