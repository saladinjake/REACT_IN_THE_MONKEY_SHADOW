import { Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Icon, Heading } from "components/lib";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

const TableHead = ({
  templateColumns,
  columnGap,
  columns,
  currentSortColumn,
  onColumnClick,
}) => {
  return (
    <Grid
      py={2}
      px={1}
      mb={2}
      columnGap={columnGap}
      templateColumns={templateColumns + " 40px"}
    >
      {columns.map((col, index) => {
        const isCurrentSortColumn = col.key === currentSortColumn.key;

        return (
          <GridItem
            key={col.key}
            {...col.styleProps}
            bg="brand.gray6"
            px={1}
            ml={index && 1}
            as="button"
            opacity={isCurrentSortColumn ? 1 : 0.5}
            onClick={onColumnClick.bind(null, col.key)}
            _hover={{ transform: "scale(0.99)" }}
            _active={{ transform: "scale(0.97)" }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Heading mute>{col.label}</Heading>

              <Icon>
                {isCurrentSortColumn ? (
                  currentSortColumn.up ? (
                    <TiArrowSortedUp />
                  ) : (
                    <TiArrowSortedDown />
                  )
                ) : (
                  <TiArrowUnsorted />
                )}
              </Icon>
            </Flex>
          </GridItem>
        );
      })}

      <GridItem></GridItem>
    </Grid>
  );
};

export default TableHead;
