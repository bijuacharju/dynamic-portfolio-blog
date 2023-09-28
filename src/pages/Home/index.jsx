import React from "react";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import HeroBG from "../../assets/home-hero-section-bg.jpg";
import ProfileImage from "../../assets/profile-image.jpg";
import { Data } from "../../data/Data";

const Home = () => {
  return (
    <Box>
      <Flex
        height={"60vh"}
        backgroundImage={HeroBG}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        boxShadow={
          "0px 4px 4px 0px #00000040,inset 0 0 0 1000px rgba(0,0,0,.5)"
        }
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize={"4xl"} fontWeight={500} color="#ffffff" align="center">
          Lines of <u>code</u> are my{" "}
          <i style={{ fontWeight: 700 }}>paintbrush,</i>
          <br /> and the <u>web</u> is my{" "}
          <i style={{ fontWeight: 700 }}>canvas.</i>
        </Text>
      </Flex>
      <Box py={12}>
        <Container maxWidth={"90em"}>
          <Text
            fontSize={"2xl"}
            fontWeight={"700"}
            align={"center"}
            textTransform={"uppercase"}
            color={"#404D49"}
          >
            About Me
          </Text>
          <Flex py={4} justifyContent={"center"}>
            <Box
              backgroundImage={ProfileImage}
              backgroundSize={"cover"}
              backgroundPosition={"center"}
              backgroundRepeat={"no-repeat"}
              height={"300px"}
              width={"300px"}
              borderRadius={"full"}
              border={"8px solid #404D49"}
            ></Box>
          </Flex>
          <Text fontSize={"md"} align={"center"}>
            {Data.about_me_text}
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
