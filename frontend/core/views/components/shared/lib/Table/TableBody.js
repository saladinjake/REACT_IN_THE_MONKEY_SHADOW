import { Flex, Grid, GridItem, Box } from "@chakra-ui/layout";
import { MdMoreVert } from "react-icons/md";
import { Button, IconButton } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { Text } from "../Typography/Text";

const TableBody = ({ rows, columnGap, templateColumns, columns }) => (
  <Box>
    {rows.map((row, index) => (
      <Grid
        columnGap={columnGap}
        templateColumns={templateColumns}
        key={row.id}
        bg={index % 2 === 0 ? "brand.gray5" : "brand.gray6"}
        p={1}
        w="100%"
        minH="28px"
      >
        {columns.map((col) => (
          <GridItem key={col.key}>
            <Text mute>{row[col.key]}</Text>
          </GridItem>
        ))}

        <GridItem
          justifySelf="flex-end"
          pos="absolute"
          zIndex={1}
          right={0}
          transform="translate(-50%, -10%)"
        >
          <Dropdown
            position="top-left"
            renderTrigger={({ onMouseOver }) => (
              <IconButton variant="ghost" onMouseOver={onMouseOver}>
                <MdMoreVert />
              </IconButton>
            )}
          >
            <Flex flexDir="column" bg="brand.white" py={2}>
              <Button mute w="100%">
                option 1
              </Button>
              <Button mute w="100%">
                option 2
              </Button>
              <Button mute w="100%">
                option 3
              </Button>
            </Flex>
          </Dropdown>
        </GridItem>
      </Grid>
    ))}
  </Box>
);

export default TableBody;
