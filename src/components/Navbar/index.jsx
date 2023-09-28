import { Box, Button, Container, Flex, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Data } from "../../data/Data";

const Navbar = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = localStorage.getItem("user");
  return (
    <Box backgroundColor={"#404D49"} color={"#ffffff"}>
      <Container maxWidth={"90em"} minHeight="14">
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          minHeight={16}
        >
          <Box>
            <Text
              fontSize={"2xl"}
              fontWeight={"bold"}
              textTransform={"uppercase"}
              as={Link}
              to="/"
            >
              {Data.name}
            </Text>
          </Box>
          <Flex alignItems={"center"} gap={8} fontWeight={500}>
            <Box _hover={{ "&>div": { transform: "scaleX(1.3)" } }}>
              <Link to="/">Home</Link>
              <Box
                height={0.5}
                backgroundColor={"#ffffff"}
                _hover={{ transform: "scaleX(1.3)" }}
                transform={`scaleX(${pathname === "/" ? "1.3" : "0"})`}
                transition={"all 0.5s ease-in-out"}
              ></Box>
            </Box>
            <Box _hover={{ "&>div": { transform: "scaleX(1.3)" } }}>
              <Link to="/blogs">Blogs</Link>
              <Box
                height={0.5}
                backgroundColor={"#ffffff"}
                transform={`scaleX(${
                  pathname.includes("/blogs") ? "1.3" : "0"
                })`}
                transition={"all 0.5s ease-in-out"}
              ></Box>
            </Box>
            {!!user && (
              <Box>
                <Button
                  variant="outline"
                  color="#ffffff"
                  _hover={{ color: "#404D49", backgroundColor: "#ffffff" }}
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/");
                    toast({
                      title: "Logged Out Successfully.",
                      status: "success",
                      variant: "left-accent",
                      position: "top-right",
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                >
                  Log Out
                </Button>
              </Box>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
