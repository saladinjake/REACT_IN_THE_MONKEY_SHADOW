import { Grid, GridItem, Box, Flex } from "@chakra-ui/layout";
import { SomethingWentWrong } from "components/pages";
import { IconButton, Text, TableModal } from "components/lib";
import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { useRouter } from "next/router";

const TableBody = ({
  rows,
  columnGap,
  templateColumns,
  columns,
  onRowClick,
  onMenuClick,
}) => {
  const [modal, setModal] = useState(null);
  const router = useRouter();

  const handleRowClick = (row) => {
    const href = onRowClick?.({ row, setModal })?.href;

    if (href) {
      router.push(href);
    }
  };

  return (
    <Box>
      {modal && <TableModal modal={modal} setModal={setModal} />}

      {rows.length ? (
        rows.map((row, index) => (
          <Flex key={row.id}>
            <Box
              flex={1}
              as="button"
              textAlign="left"
              onClick={handleRowClick.bind(null, row)}
              bg={index % 2 === 0 ? "brand.gray6" : "transparent"}
              _hover={{
                transform: "translateX(1px)",
                bg: index % 2 === 0 ? "transparent" : "brand.gray6",
              }}
            >
              <Grid
                columnGap={columnGap}
                templateColumns={templateColumns}
                px={1}
                py={2}
                w="100%"
                minH="28px"
                alignItems="center"
              >
                {columns.map((column) => {
                  const value = row[column.key] || "";
                  const extraInfoValue =
                    row.extraInfo && row.extraInfo[column.key];

                  return (
                    <GridItem key={column.key}>
                      {(column.value &&
                        column.value(extraInfoValue || value)) || (
                        <Text mute>{value}</Text>
                      )}
                    </GridItem>
                  );
                })}
              </Grid>
            </Box>

            <Flex
              alignItems="center"
              bg={index % 2 === 0 ? "brand.gray6" : "transparent"}
              pr={1}
            >
              <IconButton
                onClick={onMenuClick?.bind(null, { row, setModal })}
                variant="ghost"
                size="sm"
                disabled={!onMenuClick}
              >
                <MdMoreVert />
              </IconButton>
            </Flex>
          </Flex>
        ))
      ) : (
        <SomethingWentWrong pt={5} message="No records found!" h="100%" />
      )}
    </Box>
  );
};

export default TableBody;
