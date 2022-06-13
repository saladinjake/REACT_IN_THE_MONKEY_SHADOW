import { Button, Heading, Link } from "components/lib";
import { Section } from "../Section/Section";

export const PageNotFound = ({ signin, ...rest }) => (
  <Section
    h="100%"
    d="flex"
    flexDir="column"
    alignItems="center"
    justifyContent="center"
    {...rest}
  >
    <Heading type="h5">404 - Page Not Found</Heading>
    {signin && (
      <Link mute href="/signin">
        <Button>Sign in</Button>
      </Link>
    )}
  </Section>
);
