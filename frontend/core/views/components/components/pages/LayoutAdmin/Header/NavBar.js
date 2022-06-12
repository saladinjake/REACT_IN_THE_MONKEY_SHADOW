import { Box, Flex } from "@chakra-ui/react";
import { Avatar } from "components/shared/lib";
import useAuth from "hooks/useAuth";
import { IoMdNotifications } from "react-icons/io";
import { IconButtonWithTooltip } from "./Header";

const NavBar = ({ ...rest }) => {
  const auth = useAuth();

  return (
    <Box as="nav" {...rest}>
      <Flex>
        <IconButtonWithTooltip
          tip="Notifications"
          onClick={() => {}}
          icon={<IoMdNotifications />}
          variant="ghost"
          fontSize="1.5rem"
          // mr={3}
        />

        <IconButtonWithTooltip
          tip={auth.fullName}
          onClick={() => {}}
          icon={<Avatar />}
          variant="ghost"
        />
      </Flex>
    </Box>
  );
};

export default NavBar;
