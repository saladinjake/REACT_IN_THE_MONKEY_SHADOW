import { useState } from "react";

const useHeaderModal = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow((prev) => !prev);
  };

  return { show, setShow, handleToggle };
};

export default useHeaderModal;
