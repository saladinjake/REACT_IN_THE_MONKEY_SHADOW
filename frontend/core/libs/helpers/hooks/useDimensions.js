import useAside from "hooks/useAside";
import { useEffect, useState } from "react";

const useDimensions = () => {
  const aside = useAside();

  const asideInitialWidth = aside.isOpen ? "200px" : "55px";
  const [asideWidth, setAsideWidth] = useState(asideInitialWidth);

  useEffect(() => {
    const handleResize = () => {
      const maxPhoneSize = 500;

      if (window.innerWidth <= maxPhoneSize && aside.isOpen) {
        setAsideWidth("100vw");
      } else if (window.innerWidth <= maxPhoneSize && !aside.isOpen) {
        setAsideWidth(".1px");
      } else {
        setAsideWidth(asideInitialWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [aside.isOpen]);

  // Minus Aside's width from the view
  const mainAreaWidth = { base: `calc(100vw - ${asideWidth})`, xl: "100%" };

  return { mainAreaWidth, asideWidth };
};

export default useDimensions;
