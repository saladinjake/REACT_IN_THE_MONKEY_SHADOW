import { useEffect, useState } from "react";
import usePagination from "./usePagination";

const useTable = ({ fetchRows }) => {
  const initRows = {
    data: null,
    error: null,
    loading: false,
  };

  const { page, handlePageChange } = usePagination();

  const [rows, setRows] = useState(initRows);
  const [query, setQuery] = useState({ key: "", value: "" });

  const options = { page, query };

  useEffect(() => {
    fetchRows({ setRows, options });
  }, [page, query.value]);

  const handleSearch = (query) => {
    setQuery(query);
  };

  return {
    rows,
    setRows,
    options,
    page,
    handlePageChange,
    handleSearch,
    fetchRows,
  };
};

export const useTableRow = ({ rowsData, setRowsData }) => {
  const rows = rowsData.data ? [...rowsData.data.docs] : [];

  const updateRow = ({ rowId, payload }) => {
    const rowIndex = rows.findIndex((row) => row.id === rowId);
    let row = rows.find((row) => row.id === rowId);
    row = { ...row, ...payload };
    rows[rowIndex] = row;

    const newRowsData = { data: { ...rowsData.data, docs: rows } };
    setRowsData(newRowsData);
  };

  const deleteRow = ({ rowId }) => {
    const rowIndex = rows.findIndex((row) => row.id === rowId);
    rows.splice(rowIndex, 1);

    const newRowsData = { data: { ...rowsData.data, docs: rows } };
    setRowsData(newRowsData);
  };

  return {
    updateRow,
    deleteRow,
  };
};

export const useTableFilterForm = ({
  initialQueries,
  table,
  onClose,
  path,
  propQueryString = "",
}) => {
  const { options, setRows, fetchRows } = table;
  const [queries, setQueries] = useState(initialQueries);

  const buildUrl = ({ tableOptions, queriesObject }) => {
    let url = `${path}?${propQueryString}limit=10&page=${tableOptions.page}`;

    for (const key in queriesObject) {
      const value = queriesObject[key];

      // if there's a value
      if (value) {
        url += `&${key}=${value}`;
      }
    }

    return url;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = buildUrl({
      tableOptions: options,
      queriesObject: queries,
    });

    fetchRows({ setRows, url });

    onClose();
  };

  return { queries, setQueries, handleSubmit };
};

export default useTable;
