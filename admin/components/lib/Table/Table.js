import PropTypes from "prop-types";
import { Box, Flex } from "@chakra-ui/layout";
import { Loader, SomethingWentWrong, SearchBar } from "components/pages";
import { Pagination } from "components/lib";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { IoFilterOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Text } from "../Typography/Text";
import { Button } from "../Button/Button";
import { Link } from "../Typography/Link";
import { BsPlus } from "react-icons/bs";
import { Popover } from "@material-ui/core";

export const Table = ({
  columnGap,
  columns,
  table,
  renderAddButton,
  renderFilterButton,
  onRowClick,
  onMenuClick,
  noPagination,
  noHeader,
}) => {
  const {
    rows,
    setRows,
    options,
    page,
    handlePageChange: onPageChange,
    handleSearch: onSearch,
  } = table;

  const [rowsDocs, setRowsDocs] = useState(null);

  useEffect(() => {
    if (rows.data) {
      setRowsDocs(rows.data.docs);
    } else if (rows.loading || rows.error) {
      setRowsDocs(null);
    }
  }, [rows.data, rows.loading, rows.error]);

  const getTemplateColumns = () => {
    const defaultFr = {
      min: "130px",
      max: "1fr",
    };

    let templateColumns = "";

    columns.forEach((col) => {
      templateColumns += `minmax(${col.minFr || defaultFr.min}, ${
        col.maxFr || defaultFr.max
      }) `;
    });

    return templateColumns;
  };

  const [currentSortColumn, setCurrentSortColumn] = useState({
    key: "",
    up: true,
  });

  const handleSortColumnChange = (key) => {
    const up = currentSortColumn.key === key ? !currentSortColumn.up : true;

    setCurrentSortColumn({ key, up });
  };

  useEffect(() => {
    if (rowsDocs) {
      const data = [...rowsDocs];

      data.sort(function (firstElement, secondElement) {
        let firstValue = +firstElement[currentSortColumn.key];
        let secondValue = +secondElement[currentSortColumn.key];

        if (
          !firstValue &&
          firstValue !== 0 &&
          firstValue !== false &&
          firstValue !== "" &&
          firstValue !== undefined &&
          firstValue !== null
        ) {
          firstValue = firstElement[currentSortColumn.key];
          secondValue = secondElement[currentSortColumn.key];
        }

        if (typeof firstValue === "string") {
          firstValue = firstValue.toUpperCase().trim(); // ignore upper and lowercase
          secondValue = secondValue.toUpperCase().trim(); // ignore upper and lowercase

          if (currentSortColumn.up) {
            if (firstValue < secondValue) {
              return -1;
            }
            if (firstValue > secondValue) {
              return 1;
            }
          } else {
            if (firstValue > secondValue) {
              return -1;
            }
            if (firstValue < secondValue) {
              return 1;
            }
          }
          return 0;
        }

        if (typeof firstValue === "number") {
          return currentSortColumn.up
            ? firstValue - secondValue
            : secondValue - firstValue;
        }

        return 0;
      });

      setRowsDocs(data);
    }
  }, [currentSortColumn.key, currentSortColumn.up]);

  // useEffect(() => {
  //   console.log(rows.error);
  // }, [rows.error]);

  return (
    <Box as="section">
      <Box as="main">
        {/* Section Header */}
        {!noHeader && (
          <Header
            table={table}
            renderAddButton={renderAddButton}
            renderFilterButton={renderFilterButton}
            onSearch={onSearch}
          />
        )}

        {/* Loader instead of a Table */}
        {rows.loading && <Loader h={{ base: "150px", md: "200px" }} />}

        {/* The actual Table */}
        {rowsDocs && (
          <Box overflowX={rowsDocs.length ? "auto" : "hidden"} pb={5}>
            {/* Head */}
            <TableHead
              templateColumns={getTemplateColumns()}
              columnGap={columnGap}
              columns={columns}
              currentSortColumn={currentSortColumn}
              onColumnClick={handleSortColumnChange}
            />

            {/* Body */}
            <TableBody
              templateColumns={getTemplateColumns()}
              columnGap={columnGap}
              columns={columns}
              rows={rowsDocs}
              onRowClick={onRowClick}
              onMenuClick={onMenuClick}
            />
          </Box>
        )}

        {/* Error instead of a Table */}
        {/*  */}
        {rows.error && (
          <SomethingWentWrong
            message={rows.error}
            h={{ base: "150px", md: "200px" }}
            onRetry={table.fetchRows.bind(null, { setRows, options })}
          />
        )}
      </Box>

      {/* Section Footer */}
      {onPageChange && !noPagination && (
        <Pagination
          page={page}
          onPageChange={onPageChange}
          pageTotal={rows.data?.totalPages}
          itemTotal={rows.data?.totalDocs}
          showingItemTotal={rowsDocs?.length}
        />
      )}
    </Box>
  );
};

const Header = ({ renderAddButton, renderFilterButton, table, onSearch }) => {
  const handleSearch = (query) => {
    onSearch({ key: "q", value: query });
  };

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      alignItems={{ base: "flex-start", md: "center" }}
      flexDir={{ base: "column", lg: "row" }}
      py={{ base: 1, md: 2 }}
    >
      <SearchBar
        placeholder="Search..."
        onSearch={handleSearch}
        flex={1}
        mr={{ lg: 5 }}
        w="100%"
        w="100%"
      />

      <Flex alignSelf="flex-end" mt={{ base: 3, md: 2, lg: 0 }}>
        {renderFilterButton?.({ table })}

        {renderAddButton && <Box ml={2}>{renderAddButton()}</Box>}
      </Flex>
    </Flex>
  );
};

export const AddButton = ({ text, href }) => (
  <Link mute href={href}>
    <Button sm responsive={<BsPlus />} leftIcon={<BsPlus />}>
      {text}
    </Button>
  </Link>
);

export const FilterButton = ({ table, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleClick}
        responsive={<IoFilterOutline />}
        leftIcon={<IoFilterOutline />}
        sm
      >
        Filter
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box p={5}>{children({ onClose: handleClose, table })}</Box>
      </Popover>
    </>
  );
};

export const FilterForm = ({ onSubmit, children }) => (
  <Box as="form" onSubmit={onSubmit}>
    <Text type="md-bold" color="brand.primary">
      Select options
    </Text>

    <Box pb={5}>{children}</Box>

    <Button type="submit" variant="primary" sm mt={2}>
      Apply Filter
    </Button>
  </Box>
);

Table.propTypes = {
  table: PropTypes.object,

  columns: PropTypes.arrayOf(
    PropTypes.shape({
      // Required props
      key: PropTypes.string,
      label: PropTypes.string,
      // Optional props
      minFr: PropTypes.string,
      maxFr: PropTypes.string,
      styleProps: PropTypes.object,
    })
  ),

  // Optional
  columnGap: PropTypes.number,
  renderAddButton: PropTypes.func,
  renderFilterButton: PropTypes.func,
};

FilterForm.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.any,
};

FilterButton.propTypes = {
  table: PropTypes.object,
  children: PropTypes.any,
};
