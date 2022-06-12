import { Grid, GridItem } from "@chakra-ui/layout";
import { Heading } from "../Typography/Heading";

const TableHead = ({ templateColumns, columnGap, columns }) => {
  return (
    <Grid
      py={2}
      px={1}
      mb={2}
      bg="brand.gray6"
      columnGap={columnGap}
      templateColumns={templateColumns}
    >
      {columns.map((col) => (
        <GridItem key={col.key} {...col.styleProps}>
          <Heading mute>{col.label}</Heading>
        </GridItem>
      ))}

      <GridItem></GridItem>
    </Grid>
  );
};

export default TableHead;
