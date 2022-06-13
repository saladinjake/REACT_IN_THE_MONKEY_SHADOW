import AsideContext from "context/AsideContext";
import { useContext, useState } from "react";

const useAside = () => {
  const [state, setState] = useState({ open: true });

  const contextStore = useContext(AsideContext);

  const handleOpen = () =>
    contextStore.setState((prev) => ({ ...prev, open: true }));
  const handleClose = () =>
    contextStore.setState((prev) => ({ ...prev, open: false }));
  const handleToggle = () =>
    contextStore.setState((prev) => ({ ...prev, open: !prev.open }));

  return {
    store: { state, setState },
    state: contextStore?.state,
    isOpen: contextStore?.state?.open,
    handleOpen,
    handleClose,
    handleToggle,
  };
};

export default useAside;
