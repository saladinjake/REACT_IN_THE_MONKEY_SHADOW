import { ButtonGroup } from "@chakra-ui/button";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Button, Heading, Icon, Text, Modal, TextField } from "components/shared/lib";
import { Layout, PageHeader, Section } from "components/components/pages";
import useForm from "hooks/useForm";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import breakpoints from "theme/breakpoints";
import buildSEO from "utils/buildSEO";
import http from "utils/http";

const pageSEO = buildSEO("My Preferences", "...");

const PopModal = ({
  heading,
  initialFieldsProps,
  doSubmit,
  renderTrigger,
  submitButtonText,
}) => {
  const { formProps, handleType, fieldsProps, renderSubmitBtn } = useForm({
    doSubmit,
    initialFieldsProps,
  });

  return (
    <Modal renderTrigger={renderTrigger}>
      {({ handleClose }) => (
        <Box as="form" {...formProps}>
          <Box as="header">
            <Heading type="h5">{heading}</Heading>
          </Box>

          {fieldsProps.map((field) => (
            <TextField {...field} key={field.id} onChange={handleType} />
          ))}

          <Flex justifyContent="flex-end">
            <ButtonGroup spacing={2} justifyContent="flex-end">
              {renderSubmitBtn({
                text: submitButtonText || "Add",
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

const Card = ({ heading, data, subHeading, onEdit }) => {
  const handleRemove = async () => {
    const yes = confirm("Are you sure you want to REMOVE this?");

    if (yes) {
      // Make a request to remove this card info...
      await http.get("/me");

      // cause a reload
      location.reload();
    }
  };

  const renderControl = (onClick) => (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      color={onClick ? "brand.black2" : "brand.error"}
      _hover={{
        bg: "brand.gray5",
        cursor: "pointer",
      }}
      onClick={onClick || handleRemove}
      rounded="md"
      px={2}
    >
      <Text mute type={onClick ? "nm-bold" : "nm-regular"}>
        {onClick ? "Edit" : "Remove"}
      </Text>

      <Icon fontSize="70%" ml={2}>
        {onClick ? <FaPen /> : <FaTrashAlt />}
      </Icon>
    </Flex>
  );

  const renderRemoveButton = () => renderControl();

  const renderEditButton = () => (
    <PopModal
      heading={subHeading}
      initialFieldsProps={data}
      doSubmit={onEdit}
      renderTrigger={({ handleOpen }) => renderControl(handleOpen)}
      submitButtonText="Edit"
    />
  );

  return (
    <Box>
      <Text type="md-bold" mb={2}>
        {heading}
      </Text>

      <Flex justifyContent="space-between" bg="brand.gray5" rounded="md" p={3}>
        <Grid templateColumns="1fr 1fr 1fr" columnGap={5}>
          {data.map((item, index) => (
            <GridItem key={index}>
              <Text type="nm-bold" mute>
                {item.label}
              </Text>
              <Text>{item.value}</Text>
            </GridItem>
          ))}
        </Grid>

        <Box alignSelf="flex-end">
          {renderEditButton()}
          {renderRemoveButton()}
        </Box>
      </Flex>
    </Box>
  );
};

const Header = ({ initialFieldsProps, heading, subHeading, onAdd }) => (
  <Flex
    alignItems="center"
    justifyContent="space-between"
    borderBottom="1px"
    color="brand.secondary"
    mb={5}
    pb={2}
  >
    <Heading type="h5" mute>
      {heading}
    </Heading>

    <PopModal
      heading={subHeading}
      initialFieldsProps={initialFieldsProps}
      doSubmit={onAdd}
      renderTrigger={({ handleOpen }) => (
        <Button
          leftIcon={<IoAdd />}
          variant="secondary"
          sm
          onClick={handleOpen}
        >
          Add
        </Button>
      )}
    />
  </Flex>
);

const EditPreferencePage = () => {
  const formDataInitializer = (formData) =>
    formData.map((item) => ({ ...item, value: "" }));

  const accountInfoCardData = [
    {
      id: "address",
      label: "Address",
      textarea: true,
      minH: "40px",
      value: "Ikoyi, Lagos state, Nigeria",
    },
    {
      id: "phone-number",
      label: "Phone Number",
      type: "number",
      value: "08130870416",
    },
  ];

  const cardDetailsCardData = [
    {
      id: "card-name",
      label: "Card Name",
      value: "Alan John Smith",
    },
    {
      id: "card-type",
      label: "Card Type",
      value: "VISA",
    },
    {
      id: "card-number",
      label: "Card Number",
      value: "53999 xxxx",
    },
  ];

  const accountInfoFormData = formDataInitializer(accountInfoCardData);
  const cardDetailsFormData = formDataInitializer(cardDetailsCardData);

  const handleAddAccountInfo = async (fieldsObj, router) => {
    console.log(fieldsObj);
    await http.get("/me");

    router.reload();
  };
  const handleAddCardDetail = async (fieldsObj, router) => {
    console.log(fieldsObj);
    await http.get("/me");

    router.reload();
  };

  return (
    <Layout SEO={pageSEO}>
      <PageHeader>Edit Preference</PageHeader>

      <Section mb={16} maxW={breakpoints.md}>
        <Header
          heading="Addresses"
          subHeading="Account Information"
          onAdd={handleAddAccountInfo}
          initialFieldsProps={accountInfoFormData}
        />
        <Card
          heading="Account Information"
          data={accountInfoCardData}
          subHeading="Account Information"
          onEdit={handleAddAccountInfo}
        />
      </Section>

      <Section mb={16} maxW={breakpoints.md}>
        <Header
          heading="Payments"
          subHeading="Card Details"
          onAdd={handleAddCardDetail}
          initialFieldsProps={cardDetailsFormData}
        />
        <Card
          heading="Card Details"
          data={cardDetailsCardData}
          subHeading="Card Details"
          onEdit={handleAddCardDetail}
        />
      </Section>
    </Layout>
  );
};

export default EditPreferencePage;
