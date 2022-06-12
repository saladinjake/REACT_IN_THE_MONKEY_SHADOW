import { Section } from "components/components/pages";
import {
  // AddButton,
  // FilterButton,
  // FilterForm,
  Button,
  Heading,
  Table,
  Text,
  Image,
  Link,
} from "components/shared/lib";
import useTable, { useTableFilterForm, useTableRow } from "hooks/useTable";
import { Badge, Box, Flex, Stack } from "@chakra-ui/layout";
import http from "utils/http";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import dateFormat from "dateformat";

import { AiOutlineRight } from "react-icons/ai";
import { Chip } from "@material-ui/core";
import { IoFastFoodOutline } from "react-icons/io5";
import { FcElectronics } from "react-icons/fc";

const TableSection = ({
  mute,
  columns,
  renderFilterContent,
  addButton,
  table,
  onRowClick,
  onMenuClick,
  tableOptions,
}) => (
  <Section {...(mute ? { p: 0, shadow: "none", m: 0 } : {})}>
    <Table
      columns={columns}
      table={table}
      renderFilterButton={
        renderFilterContent
          ? () => (
               <></>
              // <FilterButton table={table}>{renderFilterContent}</FilterButton>
            )
          : null
      }
      renderAddButton={() =>
          <></>
        // addButton && <AddButton text={addButton.text} href={addButton.href} />
      }
      onRowClick={onRowClick}
      onMenuClick={onMenuClick}
      {...tableOptions}
    />
  </Section>
);

// Users
const columns_users = [
  {
    label: "First name",
    key: "firstName",
    minFr: "150px",
  },
  {
    label: "Last name",
    key: "lastName",
    minFr: "150px",
  },
  {
    label: "Email address",
    key: "email",
    minFr: "250px",
  },
  {
    label: "Referer code",
    key: "refCode",
    value: (refCode) => (
      <Text mute type="nm-bold">
        {refCode}
      </Text>
    ),
    minFr: "120px",
  },
  {
    label: "Date",
    key: "createdAt",
    value: (date) => dateFormat(date, "fullDate"),
    minFr: "225px",
  },
  {
    label: "Status",
    key: "deactivatedAt",
    value: (deactivatedAt) =>
      deactivatedAt ? (
        <Badge colorScheme="red">Deactivated</Badge>
      ) : (
        <Badge colorScheme="green">Activated</Badge>
      ),
    minFr: "100px",
    maxFr: ".5fr",
  },
];

const fetchRows_users =
  (role, path = "/users") =>
  async ({ setRows, options, url }) => {
    setRows({ loading: true });

    try {
      const {
        data: { data: resData },
      } = await http.get(
        url ||
          `${path}?limit=10&page=${options.page}&role=${role}${
            options.query.key
              ? `&${options.query.key}=${options.query.value}`
              : ""
          }`
      );

      const data = {
        totalPages: resData.pages,
        totalDocs: resData.total,

        // Map to `columns.key`
        docs: resData.docs.map((user) => ({
          ...user,
          // Map fields that don't map to `columns[<index>].key`
        })),
      };

      setRows({ data });
    } catch (err) {
      setRows({ error: err.message });
    }
  };

const handleRowClick_users = ({ row: user }) => {
  return {
    href: `/users/${user.id}`,
  };
};

const handleMenuClick_users =
  (tableRow) =>
  ({ row: user, setModal }) => {
    setModal({
      heading: `${user.firstName} ${user.lastName}`,
      list: [
        {
          text: "Preview This User",
          href: `/users/${user.id}`,
        },
        {
          text: !user.deactivatedAt
            ? "Deactivate This User"
            : "Reactivate This User",
          onClick: async () => {
            const payload = {
              deactivatedAt: !user.deactivatedAt ? new Date() : false,
            };

            // Server update
            await http.patch(
              `/users/${user.id}/${
                !user.deactivatedAt ? "deactivate" : "reactivate"
              }`
            );
            // UI update
            tableRow.updateRow({ rowId: user.id, payload });
          },
        },
      ],
    });
  };

const AdministratorsTableSection = ({ mute }) => {
  const renderFilterContent = ({ table, onClose }) => {
    const { queries, setQueries, handleSubmit } = useTableFilterForm({
      table,
      onClose,
      initialQueries: {
        isActivated: "",
        role: "marketer",
      },
      path: "/users",
    });

    const handleChange = (value, id) => {
      setQueries((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <FilterForm onSubmit={handleSubmit}>
        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "isActivated")}
          value={queries.isActivated}
        >
          <Heading mute>Status</Heading>

          <Stack direction="row">
            <Radio value="true">Activated</Radio>

            <Radio value="false" mr={2}>
              Deactivated
            </Radio>
          </Stack>
        </RadioGroup>
      </FilterForm>
    );
  };

  const fetchRows = fetchRows_users("admin");

  const table = useTable({ fetchRows });
  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  return (
    <TableSection
      mute={mute}
      columns={columns_users}
      table={table}
      onRowClick={handleRowClick_users}
      onMenuClick={handleMenuClick_users(tableRow)}
    />
  );
};

const MarketersTableSection = ({ mute }) => {
  const renderFilterContent = ({ table, onClose }) => {
    const { queries, setQueries, handleSubmit } = useTableFilterForm({
      table,
      onClose,
      initialQueries: {
        isActivated: "",
        role: "marketer",
      },
      path: "/users",
    });

    const handleChange = (value, id) => {
      setQueries((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <FilterForm onSubmit={handleSubmit}>
        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "isActivated")}
          value={queries.isActivated}
        >
          <Heading mute>Status</Heading>

          <Stack direction="row">
            <Radio value="true">Activated</Radio>

            <Radio value="false" mr={2}>
              Deactivated
            </Radio>
          </Stack>
        </RadioGroup>
      </FilterForm>
    );
  };
  const fetchRows = fetchRows_users("marketer");

  const table = useTable({ fetchRows });
  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  return (
    <TableSection
      mute={mute}
      columns={columns_users}
      table={table}
      onRowClick={handleRowClick_users}
      onMenuClick={handleMenuClick_users(tableRow)}
    />
  );
};

const CustomersTableSection = ({
  mute,
  queryString: propQueryString = "",
  path,
}) => {
  const renderFilterContent = ({ table, onClose }) => {
    const { queries, setQueries, handleSubmit } = useTableFilterForm({
      table,
      onClose,
      initialQueries: {
        isActivated: "",
        role: "customer",
      },
      path,
      propQueryString,
    });

    const handleChange = (value, id) => {
      setQueries((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <FilterForm onSubmit={handleSubmit}>
        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "isActivated")}
          value={queries.isActivated}
        >
          <Heading mute>Status</Heading>

          <Stack direction="row">
            <Radio value="true">Activated</Radio>

            <Radio value="false" mr={2}>
              Deactivated
            </Radio>
          </Stack>
        </RadioGroup>
      </FilterForm>
    );
  };

  const fetchRows = fetchRows_users("customer", path);

  const table = useTable({ fetchRows });
  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  return (
    <TableSection
      mute={mute}
      columns={columns_users}
      table={table}
      onRowClick={handleRowClick_users}
      onMenuClick={handleMenuClick_users(tableRow)}
    />
  );
};
// End Users

const OrdersTableSection = ({
  mute,
  heading,
  queryString: propQueryString = "",
  path = "/orders",
}) => {
  const options = heading ? { noPagination: true, noHeader: true } : {};

  const columns = [
    {
      label: "Tracking ID",
      key: "trackingId",
      minFr: "140px",
    },
    {
      label: "Cost",
      key: "amount",
      value: (amount) => amount,
      minFr: "130px",
    },
    {
      label: "Ordered By",
      key: "creator",
      value: (creator) => (
        <Box>
          <Text mute>{creator.name}</Text>
          <Text mute type="sm-bold">
            {creator.role}
          </Text>
        </Box>
      ),
      minFr: "200px",
    },
    {
      label: "Date",
      key: "createdAt",
      value: (date) => dateFormat(date, "fullDate"),
      minFr: "225px",
    },

    {
      label: "Status",
      key: "delivered",
      value: (delivered) =>
        delivered ? (
          <Badge colorScheme="green">Delivered</Badge>
        ) : (
          <Badge colorScheme="red">Not Delivered</Badge>
        ),
      minFr: "120px",
    },
  ];

  const renderFilterContent = ({ table, onClose }) => {
    const { queries, setQueries, handleSubmit } = useTableFilterForm({
      table,
      onClose,
      initialQueries: {
        delivered: "",
      },
      path,
      propQueryString,
    });

    const handleChange = (value, id) => {
      setQueries((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <FilterForm onSubmit={handleSubmit}>
        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "delivered")}
          value={queries.delivered}
        >
          <Heading mute>Status</Heading>

          <Stack direction="row">
            <Radio value="true">Delivered</Radio>

            <Radio value="false" mr={2}>
              Not Delivered
            </Radio>
          </Stack>
        </RadioGroup>
      </FilterForm>
    );
  };

  const fetchRows = async ({ setRows, options, url }) => {
    setRows({ loading: true });

    try {
      const {
        data: { data: resData },
      } = await http.get(
        url ||
          `${path}?${propQueryString}limit=10&page=${options.page}${
            options.query.key
              ? `&${options.query.key}=${options.query.value}`
              : ""
          }`
      );

      const data = {
        totalPages: resData.pages,
        totalDocs: resData.total,

        // Map to `columns.key`
        docs: resData.docs.map((order) => ({
          ...order,
          // Map fields that don't map to `columns[<index>].key`
          creator: order.creatorId,
          extraInfo: {
            creator: {
              name: order.creatorId,
              role: Math.random() > 0.5 ? "Customer" : "Marketer",
            },
          },
        })),
      };

      setRows({ data });
    } catch (err) {
      setRows({ error: err.message });
    }
  };

  const table = useTable({ fetchRows });
  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  const handleRowClick = ({ row: order, setModal }) => {
    setModal({
      heading: order.trackingId,
      list: [
        {
          text: "View Order Details",
          href: `/orders/${order.id}`,
        },
        {
          text: order.delivered ? "Mark As Not Delivered" : "Mark As Delivered",
          onClick: async () => {
            const payload = {
              delivered: !order.delivered,
            };

            // Server update
            await http.patch(`/orders/${order.id}/delivery`);
            // UI update
            tableRow.updateRow({ rowId: order.id, payload });
          },
        },
      ],
    });
  };

  return (
    <Box>
      {heading && (
        <Flex alignItems="center" justifyContent="space-between" mb={2}>
          <Heading
            type="h5"
            mute
            textTransform="capitalize"
            color="brand.secondary"
          >
            {heading}
          </Heading>

          <Link mute href="/orders">
            <Button sm rightIcon={<AiOutlineRight />} color="brand.secondary">
              See all
            </Button>
          </Link>
        </Flex>
      )}

      <TableSection
        mute={mute}
        columns={columns}
        table={table}
        onRowClick={handleRowClick}
        onMenuClick={handleRowClick}
        tableOptions={options}
      />
    </Box>
  );
};

const CategoriesTableSection = ({ mute, path }) => {
  const columns = [
    {
      label: "Category name",
      key: "name",
      minFr: "200px",
    },
    {
      label: "Created by",
      key: "creatorId",
      // value: (creator) => (
      //   <Box>
      //     <Text mute>{creator.name}</Text>
      //     <Text mute type="sm-bold" opacity={0.8}>
      //       {creator.role}
      //     </Text>
      //   </Box>
      // ),
      minFr: "200px",
    },
    {
      label: "Product class",
      key: "productClass",
      value: (productClass) => (
        <Chip
          label={productClass}
          icon={
            productClass.includes("food") ? (
              <IoFastFoodOutline />
            ) : (
              <FcElectronics />
            )
          }
        />
      ),
      minFr: "150px",
      maxFr: ".8fr",
    },
    {
      label: "Date",
      key: "createdAt",
      value: (date) => dateFormat(date, "fullDate"),
      minFr: "225px",
    },
    {
      label: "Status",
      key: "active",
      value: (active) =>
        active ? (
          <Badge colorScheme="green">Activated</Badge>
        ) : (
          <Badge colorScheme="red">Deactivated</Badge>
        ),
      minFr: "80px",
      maxFr: ".5fr",
    },
  ];

  const renderFilterContent = ({ table, onClose }) => {
    const { queries, setQueries, handleSubmit } = useTableFilterForm({
      table,
      onClose,
      initialQueries: {
        productClass: "",
        active: "",
      },
      path: "/product-categories",
    });

    const handleChange = (value, id) => {
      setQueries((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <FilterForm onSubmit={handleSubmit}>
        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "productClass")}
          value={queries.productClass}
        >
          <Heading mute>Product Class</Heading>

          <Stack direction="row">
            <Radio value="electronics" mr={2}>
              Electronics
            </Radio>
            <Radio value="food-packs">Food packs</Radio>
          </Stack>
        </RadioGroup>

        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "active")}
          value={queries.active}
        >
          <Heading mute>Status</Heading>

          <Stack direction="row">
            <Radio value="true">Activated</Radio>

            <Radio value="false" mr={2}>
              Deactivated
            </Radio>
          </Stack>
        </RadioGroup>
      </FilterForm>
    );
  };

  const fetchRows = async ({ setRows, options, url }) => {
    setRows({ loading: true });

    try {
      const {
        data: { data: resData },
      } = await http.get(
        url ||
          `/product-categories?limit=10&page=${options.page}${
            options.query.key
              ? `&${options.query.key}=${options.query.value}`
              : ""
          }`
      );

      const data = {
        totalPages: resData.pages,
        totalDocs: resData.total,

        // Map to `columns.key`
        docs: resData.docs.map((category) => ({
          ...category,
          // Map fields that don't map to `columns[<index>].key`
        })),
      };

      setRows({ data });
    } catch (err) {
      setRows({ error: err.message });
    }
  };

  const table = useTable({ fetchRows });
  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  const handleRowClick = ({ row: category, setModal }) => {
    setModal({
      heading: category.name,
      list: [
        {
          text: "Edit This Category",
          href: `/categories/${category.id}`,
        },
        {
          text: category.active
            ? "Deactivate This Category"
            : "Activate This Category",
          onClick: async () => {
            const payload = {
              active: !category.active,
            };

            // Server update
            await http.patch(`/product-categories/${category.id}`, payload);
            // UI update
            tableRow.updateRow({ rowId: category.id, payload });
          },
        },
        {
          text: "Delete This Category",
          props: {
            color: "brand.error",
          },
          onClick: async () => {
            // Server update
            await http.delete(`/product-categories/${category.id}`);
            // UI update
            tableRow.deleteRow({ rowId: category.id });
          },
        },
      ],
    });
  };

  return (
    <TableSection
      mute={mute}
      columns={columns}
      table={table}
      addButton={{ text: "Add new category", href: "/categories/add" }}
      onRowClick={handleRowClick}
      onMenuClick={handleRowClick}
    />
  );
};

const ProductsTableSection = ({ mute }) => {
  const columns = [
    {
      label: "Product name",
      key: "product",
      value: (product) => (
        <Flex alignItems="center">
          <Image src={product.imageUrl} w="50px" h="50px" isProduct mr={1} />
          <Text mute>{product.name}</Text>
        </Flex>
      ),
      minFr: "350px",
    },
    {
      label: "Created by",
      key: "creator",
      value: (creator) => (
        <Box>
          <Text mute>{creator.name}</Text>
          <Text mute type="sm-bold" opacity={0.8}>
            {creator.role}
          </Text>
        </Box>
      ),
      minFr: "200px",
    },
    {
      label: "Product price",
      key: "price",
      value: (amount) => amount,
      minFr: "130px",
    },
    {
      label: "Date",
      key: "createdAt",
      value: (date) => dateFormat(date, "fullDate"),
      minFr: "225px",
    },
    {
      label: "Status",
      key: "isPublished",
      value: (isPublished) =>
        isPublished ? (
          <Badge colorScheme="green">Published</Badge>
        ) : (
          <Badge colorScheme="red">Not Published</Badge>
        ),
      minFr: "120px",
    },
  ];

  const renderFilterContent = ({ table, onClose }) => {
    const { queries, setQueries, handleSubmit } = useTableFilterForm({
      table,
      onClose,
      initialQueries: {
        isPublished: "",
      },
      path: "/products",
    });

    const handleChange = (value, id) => {
      setQueries((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <FilterForm onSubmit={handleSubmit}>
        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "isPublished")}
          value={queries.isPublished}
        >
          <Heading mute>Status</Heading>

          <Stack direction="row">
            <Radio value="true">Published</Radio>

            <Radio value="false" mr={2}>
              Not Published
            </Radio>
          </Stack>
        </RadioGroup>
      </FilterForm>
    );
  };

  const fetchRows = async ({ setRows, options, url }) => {
    setRows({ loading: true });

    try {
      const {
        data: { data: resData },
      } = await http.get(
        url ||
          `/products?limit=10&page=${options.page}${
            options.query.key
              ? `&${options.query.key}=${options.query.value}`
              : ""
          }`
      );

      const data = {
        totalPages: resData.pages,
        totalDocs: resData.total,

        // Map to `columns.key`
        docs: resData.docs.map((product) => ({
          ...product,
          // Map fields that don't map to `columns[<index>].key`
          product: product.name,
          creator: product.creatorId,
          // Columns with extra informations
          extraInfo: {
            product: {
              name: product.name,
              imageUrl:
                product.primaryImage?.imageUrl ||
                "/images/products/default.png",
            },
            creator: {
              name: product.creatorId,
              role: Math.random() > 0.5 ? "Customer" : "Marketer",
            },
          },
        })),
      };

      setRows({ data });
    } catch (err) {
      setRows({ error: err.message });
    }
  };

  const table = useTable({ fetchRows });
  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  const handleRowClick = ({ row: product }) => {
    return {
      href: `/products/${product.id}`,
    };
  };

  const handleMenuClick = ({ row: product, setModal }) => {
    setModal({
      heading: product.product,
      list: [
        {
          text: "Edit This Product",
          href: `/products/${product.id}`,
        },
        {
          text: product.isPublished
            ? "Mark As Un-published"
            : "Mark As Published",
          onClick: async () => {
            const payload = {
              isPublished: !product.isPublished,
            };

            // Server update
            await http.patch(`/products/${product.id}`, payload);

            // UI update
            tableRow.updateRow({ rowId: product.id, payload });
          },
        },
        {
          text: "Delete This Product",
          props: {
            color: "brand.error",
          },
          onClick: async () => {
            // Server update
            await http.delete(`/products/${product.id}`);

            // UI update
            tableRow.deleteRow({ rowId: product.id });
          },
        },
      ],
    });
  };

  return (
    <TableSection
      mute={mute}
      columns={columns}
      table={table}
      addButton={{ text: "Add new product", href: "/products/add" }}
      onRowClick={handleRowClick}
      onMenuClick={handleMenuClick}
    />
  );
};

export {
  AdministratorsTableSection,
  CustomersTableSection,
  CategoriesTableSection,
  MarketersTableSection,
  OrdersTableSection,
  ProductsTableSection,
};
