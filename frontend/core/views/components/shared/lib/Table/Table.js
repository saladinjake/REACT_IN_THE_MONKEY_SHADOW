import PropTypes from "prop-types";
import { Box, Flex } from "@chakra-ui/layout";
import {
  Loader,
  SomethingWentWrong,
  SearchBar,
  headerHeight,
} from "components/components/pages";
import { Button } from "components/shared/lib";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useCallback, useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { Pagination } from "./Pagination";
import usePagination from "hooks/usePagination";

export const Table = ({ path, renderAddButton, columnGap, columns = 5 }) => {
  const initRows = {
    data: null,
    error: null,
    loading: false,
  };
  const [rows, setRows] = useState(initRows);

  const pagination = usePagination();

  const fetchRows = useCallback(async () => {
    // const limit = 10;
    // const query = `${path}?page=${page}&limit=${limit}`;

    setRows({ ...initRows, loading: true });
    try {
      // const { data: { data } } = await http.get(query)
      // setRows({ ...initRows, data });

      await new Promise((res) => {
        setTimeout(() => {
          const data = [
            {
              id: "22342sdfsdlsdf",
              name: "Yayha Tunadref",
              address: "2828 S Avenida Santa Clara,Tucson, AZ 85756",
              phoneNumber: "6123456789",
              dateOfOpening: "24 May, 2021",
            },
            {
              id: "223423",
              name: "Karma Puonche",
              address: "2828 Santa Clara,Tucson, AZ 85756",
              phoneNumber: "1234567890",
              dateOfOpening: "24 May, 2020",
            },
          ];

          if (!data.length) {
            throw new Error("Sorry, This page is Empty");
          }

          setRows({ ...initRows, data });

          res("done");
        }, 2000);
      });
    } catch (err) {
      setRows({ ...initRows, err: err.message });
    }
  }, [pagination.page]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

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

    templateColumns += "minmax(35px, .3fr)";

    return templateColumns;
  };

  return (
    <Box as="section">
      <Box as="main">
        {/* Section Header */}
        <Header renderAddButton={renderAddButton} />

        {/* Loader instead of a Table */}
        {rows.loading && <Loader h={{ base: "150px", md: "200px" }} />}

        {/* The actual Table */}
        {rows.data && (
          <Box overflowX="auto" pb={5}>
            {/* Head */}
            <TableHead
              templateColumns={getTemplateColumns()}
              columnGap={columnGap}
              columns={columns}
            />

            {/* Body */}
            <TableBody
              templateColumns={getTemplateColumns()}
              columnGap={columnGap}
              columns={columns}
              rows={rows.data}
            />
          </Box>
        )}

        {/* Error instead of a Table */}
        {rows.error && (
          <SomethingWentWrong h={{ base: "150px", md: "200px" }} />
        )}
      </Box>

      {/* Section Footer */}
      <Pagination
        page={pagination.page}
        onPageChange={pagination.handlePageChange}
        itemTotal={rows?.data?.length}
        // pageTotal={2}
      />
    </Box>
  );
};

const Header = ({ renderAddButton, columns }) => {
  const handleSearchFilter = (query) => {
    console.log(query);
  };

  return (
    <Flex
      as="header"
      alignItems="center"
      pos="sticky"
      top={{ base: headerHeight.base, lg: headerHeight.lg }}
      zIndex={10}
      py={{ base: 1, md: 2 }}
      bg="brand.gray6"
    >
      <SearchBar
        placeholder="Type to filter..."
        onSearch={handleSearchFilter}
        flex={0.7}
        minW="200px"
      />
      <Box flex={1} mx={{ base: 1, md: 5 }}>
        <Button
          variant="secondary"
          sm
          leftIcon={<IoFilterOutline />}
          responsive={<IoFilterOutline />}
        >
          Filter
        </Button>
      </Box>

      <Box>{renderAddButton({ columns })}</Box>
    </Flex>
  );
};

Table.propTypes = {
  path: PropTypes.string,
  renderAddButton: PropTypes.func,
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
};
