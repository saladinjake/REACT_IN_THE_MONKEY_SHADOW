import { Flex } from "@chakra-ui/layout";



import { Button, Link } from "components/shared/lib/";
import breakpoints from "theme/breakpoints";
import { Section } from "../Section/Section";

export const AccountAuth = () => (
  <Section pt={20} pb={30} maxW={breakpoints.md}>
    <Flex flexDir="column">
      <Link mute href="/signin?redirect=/account">
        <Button mb={5} variant="primary" w="100%">
          Sign in to view your account
        </Button>
      </Link>
    </Flex>
  </Section>
);
