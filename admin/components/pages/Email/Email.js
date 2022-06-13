import { Box } from "@chakra-ui/layout";
import { Text } from "components/lib";
import { Loader, SomethingWentWrong } from "../Feedback/Feedback";

export const EmailLoader = ({ h = "200px", ...rest }) => {
  return (
    <Box {...rest}>
      <Loader h={h} message="Sending email, please wait..." />
    </Box>
  );
};

export const EmailError = ({
  message = "Email not sent! please try again later.",
  description,
  h = "200px",
  onRetry,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <SomethingWentWrong
        message={message}
        description={description}
        h={h}
        onRetry={onRetry}
      />
    </Box>
  );
};

export const EmailSuccess = ({
  emailAddress,
  message = (
    <Text>
      An Email has been sent to{" "}
      <Text as="span" color="brand.success" type="nm-bold">
        {emailAddress}
      </Text>
      , please kindly check your email to confirm.
    </Text>
  ),
  h = "200px",
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Text type="lg-bold" color="brand.success">
        Email is sent!
      </Text>
      {message}
    </Box>
  );
};
