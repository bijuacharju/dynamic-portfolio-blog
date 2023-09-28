import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";
import { Data } from "../../data/Data";

const Footer = () => {
  return (
    <Box backgroundColor={"#404D49"}>
      <Container maxWidth={"90em"}>
        <Box>
          <Text
            lineHeight={"54px"}
            color={"#ffffff"}
            align={"center"}
            fontWeight={500}
          >
            &copy; {new Date().getFullYear()}. Designed and Developed by{" "}
            {Data.name}
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
