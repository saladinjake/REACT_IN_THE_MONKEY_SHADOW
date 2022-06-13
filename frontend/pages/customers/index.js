import { useEffect } from "react";
import { ButtonGroup } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Button, Modal, Table, TextField } from "components/shared/lib";
import { Layout, PageHeader, Section } from "components/components/pages";
import useForm from "hooks/useForm";
import useAuth from "hooks/useAuth";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("My Customers", "my customers page description");

const AddCustomerButton = ({
  doSubmit = async (fieldsObj, router) => {
    // await http.post("<URL>", fieldsObj);

    setTimeout(() => {
      router.reload();
    }, 1000);
  },
  initialFieldsProps = [
    {
      id: "name:",
      label: "Name:",
    },
    {
      id: "address",
      label: "Address",
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
    },
    {
      id: "dateOfOpening",
      label: "Date Of Opening",
    },
  ],
  successToast = "New Customer Added",
}) => {
  const {
    formProps,
    handleType,
    fieldsProps,
    renderSubmitBtn,
    formSubmitState,
  } = useForm({ doSubmit, initialFieldsProps });
  const toast = useToast();

  useEffect(() => {
    if (formSubmitState.hasSubmitError) {
      toast({
        description: formSubmitState.hasSubmitError,
        status: "error",
        duration: 3 * 1000,
        position: "top",
      });
    }

    if (formSubmitState.hasSubmitted) {
      toast({
        description: successToast,
        status: "success",
        duration: 3 * 1000,
        position: "top",
      });
    }
  }, [
    formSubmitState.hasSubmitted,
    formSubmitState.hasSubmitError,
    successToast,
  ]);

  return (
    <Modal
      renderTrigger={({ handleOpen }) => (
        <Button
          variant="primary"
          sm
          leftIcon={<AiOutlineUserAdd />}
          responsive={<AiOutlineUserAdd />}
          onClick={handleOpen}
        >
          Add new customer
        </Button>
      )}
    >
      {({ handleClose }) => (
        <Box as="form" {...formProps}>
          <Box py={5}>
            {fieldsProps.map((field) => (
              <TextField key={field.id} {...field} onChange={handleType} />
            ))}
          </Box>

          <Flex justifyContent="flex-end">
            <ButtonGroup spacing={2}>
              {renderSubmitBtn({
                text: "Add",
                variant: "primary",
                sm: true,
              })}

              <Button variant="secondary" sm onClick={handleClose}>
                Cancel
              </Button>
            </ButtonGroup>
          </Flex>
        </Box>
      )}
    </Modal>
  );
};

const TableSection = ({ path }) => {
  const columns = [
    {
      label: "Customer Name",
      key: "name",
      minFr: "200px",
    },
    {
      label: "Address",
      key: "address",
      minFr: "300px",
    },
    {
      label: "Phone Number",
      key: "phoneNumber",
      minFr: "130px",
    },
    {
      label: "Date Of Opening",
      key: "dateOfOpening",
      minFr: "130px",
    },
  ];

  return (
    <Section pb={20}>
      <Table
        path={path}
        renderAddButton={({ columns }) => <AddCustomerButton />}
        columns={columns}
      />
    </Section>
  );
};

const PageNotFound = () => <Flex>Page not found</Flex>;

const PageNotFoundSection = () => (
  <Section>
    <PageNotFound />
  </Section>
);

const CustomerPage = () => {
  const auth = useAuth();
  const { currentUser } = auth;

  const renderContent = () => {
    if (!auth.isAuthenticated || currentUser.role !== "marketer") {
      return <PageNotFoundSection />;
    }
    
    return <TableSection path="/customers" />;
  };

  return (
    <Layout SEO={pageSEO} bg="brand.gray6">
      <PageHeader>My Customers</PageHeader>

      {renderContent()}
    </Layout>
  );
};

export default CustomerPage;
