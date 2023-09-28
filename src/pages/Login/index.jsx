import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Data } from "../../data/Data";
import { useNavigate } from "react-router-dom";

const defaultLogin = {
  username: "",
  password: "",
};

const defaultError = {
  username: "",
  password: "",
};

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loginDetail, setLoginDetail] = useState(defaultLogin);
  const [errorMessage, setErrorMessage] = useState(defaultError);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    setErrorMessage(defaultError);
    if (loginDetail.username === "") {
      setErrorMessage((prev) => {
        return { ...prev, username: "Username is required!" };
      });
    } else if (loginDetail.username !== "admin") {
      setErrorMessage((prev) => {
        return { ...prev, username: "Username is incorrect!" };
      });
    } else {
      setErrorMessage((prev) => {
        return { ...prev, username: "" };
      });
    }
    if (loginDetail.password === "") {
      setErrorMessage((prev) => {
        return { ...prev, password: "Password is required!" };
      });
    } else if (loginDetail.password !== "admin") {
      setErrorMessage((prev) => {
        return { ...prev, password: "Password is incorrect!" };
      });
    } else {
      setErrorMessage((prev) => {
        return { ...prev, password: "" };
      });
    }
    if (
      loginDetail.username === Data.username &&
      loginDetail.password === Data.password
    ) {
      localStorage.setItem("user", JSON.stringify(loginDetail));
      navigate("/blogs");
      toast({
        title: "Logged In Successfully.",
        status: "success",
        variant: "left-accent",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Container maxWidth={"90em"} py={12}>
        <Flex alignItems={"center"} flexDirection={"column"}>
          <Box>
            <Card
              width={{ base: "sx", sm: "sm", md: "sm", lg: "md", xl: "2xl" }}
            >
              <CardBody>
                <Text
                  fontSize={"4xl"}
                  fontWeight={"700"}
                  align={"center"}
                  textTransform={"uppercase"}
                  color={"#404D49"}
                  textDecoration={"underline"}
                >
                  Login
                </Text>
                <Box>
                  <form onSubmit={handleSubmit}>
                    <Stack
                      sx={{
                        "& input:focus-visible": {
                          borderColor: "#404D49",
                          boxShadow: "0 0 0 1px #404D49",
                        },
                      }}
                    >
                      <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                          type="text"
                          name="username"
                          onChange={(event) => {
                            setLoginDetail((prev) => {
                              return { ...prev, username: event.target.value };
                            });
                          }}
                        />
                        <FormHelperText color={"#d00101"}>
                          {errorMessage.username}
                        </FormHelperText>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          name="password"
                          onChange={(event) => {
                            setLoginDetail((prev) => {
                              return { ...prev, password: event.target.value };
                            });
                          }}
                        />
                        <FormHelperText color={"#d00101"}>
                          {errorMessage.password}
                        </FormHelperText>
                      </FormControl>
                      <Button
                        type="submit"
                        variant="solid"
                        color="#ffffff"
                        backgroundColor={"#404D49"}
                        _hover={{
                          backgroundColor: "#66706d",
                        }}
                        _active={{
                          backgroundColor: "#333d3a",
                        }}
                      >
                        Login
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </CardBody>
            </Card>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Login;
