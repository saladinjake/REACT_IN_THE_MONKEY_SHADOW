import {
  Accordion as AccordionUI,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Box } from "@chakra-ui/layout";

export const Accordion = ({
  data,
  defaultIndex = 0,
  headerProps,
  contentProps,
  allowMultiple,
  ...rest
}) => {
  defaultIndex =
    typeof defaultIndex === "number" ? [defaultIndex] : defaultIndex;

  const settings = allowMultiple
    ? {
        allowToggle: undefined,
        allowMultiple,
      }
    : {
        allowToggle: true,
      };

  return (
    <AccordionUI
      defaultIndex={defaultIndex}
      borderColor="brand.color"
      {...settings}
      {...rest}
    >
      {data.map((item) => (
        <AccordionItem key={item.header}>
          <h2>
            <AccordionButton {...headerProps}>
              <Box flex="1" textAlign="left">
                {item.header}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel {...contentProps}>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </AccordionUI>
  );
};
