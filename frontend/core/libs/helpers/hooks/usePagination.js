import { useState } from "react";

const usePagination = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (n) => {
    setPage((prev) => prev + n);
  };

  return {
    page,
    setPage,
    handlePageChange,
  };
};

export default usePagination;
