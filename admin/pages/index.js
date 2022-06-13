import { Layout, Section, OrdersTableSection } from "components/pages";
import { Heading, Icon, Text } from "components/lib";
import { Box, Grid, GridItem } from "@chakra-ui/layout";
import { RiRadioButtonLine } from "react-icons/ri";
import { Line } from "react-chartjs-2";
import useAside from "hooks/useAside";
import colors from "theme/colors";
import useDimensions from "hooks/useDimensions";

const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "# of Sales",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: colors.brand.primary,
      borderColor: "rgba(67, 178, 99, .65)",
    },
    {
      label: "# of Refunds",
      data: [5, 10, 7, 15, 6, 15],
      fill: false,
      backgroundColor: colors.brand.secondary,
      borderColor: "rgba(0, 61, 89, .3)",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.4, // enables bezier curves
    },
  },
};

const DashboardPage = () => {
  const aside = useAside();
  const dimensions = useDimensions();

  const formatOverviewCount = (number) =>
    number.toLocaleString("en-US", {
      minimumFractionDigits: 0,
    });

  const overview = [
    {
      title: "orders",
      count: 1456789,
      color: "brand.primary",
    },
    {
      title: "Products",
      count: 1456789,
      color: "brand.error",
    },
  ];

  const renderLineChart = ({ ...rest }) => (
    <Box
      w={{
        // Responsive
        // base: "calc(100vw - 18px)",
        // End Responsive
        base: "400px",
        md: `calc(100vw - 30px - ${dimensions.asideWidth})`,
        lg: `calc(100vw - 340px - ${dimensions.asideWidth})`,
      }}
      p={{ base: 2, md: 5 }}
      rounded="md"
      shadow="md"
      bg="brand.white"
      border="1px"
      borderColor="brand.gray6"
      {...rest}
    >
      <Line data={data} options={options} />
    </Box>
  );

  return (
    <Layout>
      <Section mute mb={10}>
        <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }}>
          <Box
            mb={{ base: 10, lg: 0 }}
            // flex={aside.isOpen ? 0.5 : 0.3}
            mr={{ lg: 5 }}
          >
            <Heading mb={2} type="h5" color="brand.secondary">
              Overview
            </Heading>

            <Grid
              w="100%"
              templateColumns={{ base: "1fr" }}
              d={{ base: "grid", md: "flex", lg: "grid" }}
              gap={{ base: 5, lg: 2, lg2: 4, xl: 5 }}
            >
              {overview.map((item) => (
                <GridItem
                  flex={{ md: 1 }}
                  key={item.title}
                  d="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  h="100px"
                  w="100%"
                  px={5}
                  rounded="md"
                  shadow="md"
                  bg="brand.white"
                >
                  <Box>
                    <Text textTransform="capitalize">total {item.title}</Text>
                    <Text mute type="md-regular">
                      {formatOverviewCount(item.count)}
                    </Text>
                  </Box>

                  <Icon fontSize="3rem" color={item.color}>
                    <RiRadioButtonLine />
                  </Icon>
                </GridItem>
              ))}
            </Grid>
          </Box>

          <Box>
            <Heading mb={2} type="h5" color="brand.secondary">
              Sales Record
            </Heading>

            {/* For mobile devices */}
            <Box
              // Scroll bar
              w="calc(100vw - 18px)"
              overflowX="scroll"
              // End Scroll bar

              d={{ base: "block", md: "none" }}
            >
              {renderLineChart({ d: { base: "block", md: "none" } })}
            </Box>

            {/* From Tab devices */}
            {renderLineChart({ d: { base: "none", md: "block" } })}
          </Box>
        </Grid>
      </Section>

      <OrdersTableSection heading="recent orders" />
    </Layout>
  );
};

export default DashboardPage;
