import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const BasicLayout = ({ children }) => {
  return (
    <Flex flexDirection={"column"} minHeight={"100vh"}>
      <Navbar />
      <Box backgroundColor={"#ebedec"} flex={1}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default BasicLayout;
