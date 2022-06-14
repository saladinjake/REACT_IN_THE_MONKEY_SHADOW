import {
  Layout,
  Section,
  AdministratorsTableSection,
  CustomersTableSection,
  MarketersTableSection,
  Loader,
} from "components/pages";
import { Link } from "components/lib";
import buildSEO from "utils/buildSEO";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import usePageTab from "hooks/usePageTab";

const pageSEO = buildSEO("All Users", "Description");

const UsersPage = () => {
  const tabs = [
    { heading: "Customers" },
    { heading: "Marketers" },
    { heading: "Administrators" },
  ];

  const pageTab = usePageTab(tabs);

  return (
    <Layout SEO={pageSEO} page="users">
      <Section>
        <Tabs colorScheme="green" index={pageTab.index}>
          <TabList>
            {tabs.map((tab) => (
              <Tab key={tab.heading}>
                {pageTab.renderHeaderControl({ tab })}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel p={0} pt={2}>
              <CustomersTableSection mute />
            </TabPanel>
            <TabPanel p={0} pt={2}>
              <MarketersTableSection mute />
            </TabPanel>
            <TabPanel p={0} pt={2}>
              <AdministratorsTableSection mute />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Section>
    </Layout>
  );
};

export default UsersPage;
