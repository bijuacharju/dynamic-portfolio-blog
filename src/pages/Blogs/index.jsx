import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import BlogBG from "../../assets/blog-hero-section-bg.jpg";
import BlogCard from "../../components/BlogCard";

const defaultBlog = {
  id: 0,
  title: "",
  description: "",
  created_date: Date.now(),
};

const defaultError = {
  title: "",
  description: "",
};

const Blogs = () => {
  const toast = useToast();
  const user = localStorage.getItem("user");
  const [blogList, setBlogList] = useState(
    localStorage.getItem("blog_list")
      ? JSON.parse(localStorage.getItem("blog_list"))
      : []
  );
  const [blogDetail, setBlogDetail] = useState(defaultBlog);
  const [errorMessage, setErrorMessage] = useState(defaultError);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (event) => {
    event.preventDefault();
    let isError = false;
    setErrorMessage(defaultError);
    if (blogDetail.title === "") {
      setErrorMessage((prev) => {
        return { ...prev, title: "Title is required!" };
      });
      isError = true;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, title: "" };
      });
    }
    if (blogDetail.description === "") {
      setErrorMessage((prev) => {
        return { ...prev, description: "Description is required!" };
      });
      isError = true;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, description: "" };
      });
    }
    if (isError) {
      return;
    }
    if (blogDetail.title && blogDetail.description) {
      const storedBlogs = localStorage.getItem("blog_list");
      if (!!storedBlogs && JSON.parse(storedBlogs).length > 0) {
        const parsedBlogs = JSON.parse(storedBlogs);
        if (blogDetail.id === 0) {
          localStorage.setItem(
            "blog_list",
            JSON.stringify([
              ...parsedBlogs,
              {
                ...blogDetail,
                id: parsedBlogs[parsedBlogs.length - 1].id + 1,
              },
            ])
          );
        } else {
          localStorage.setItem(
            "blog_list",
            JSON.stringify(
              parsedBlogs.map((blog) => {
                if (blog.id === blogDetail.id) {
                  return blogDetail;
                } else {
                  return blog;
                }
              })
            )
          );
        }
      } else {
        localStorage.setItem(
          "blog_list",
          JSON.stringify([{ ...blogDetail, id: 1 }])
        );
      }
      toast({
        title: `Blog ${
          blogDetail.id === 0 ? "Added" : "Updated"
        } Successfully.`,
        status: "success",
        variant: "left-accent",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      setErrorMessage(defaultError);
      setBlogList(JSON.parse(localStorage.getItem("blog_list")));
      setBlogDetail(defaultBlog);
      onClose();
    }
  };

  const handleDelete = (id) => {
    const storedBlogs = JSON.parse(localStorage.getItem("blog_list"));
    const filteredBlogs = storedBlogs.filter((blog) => blog.id !== id);
    localStorage.setItem("blog_list", JSON.stringify(filteredBlogs));
    setBlogList(JSON.parse(localStorage.getItem("blog_list")));
    toast({
      title: `Blog Deleted Successfully.`,
      status: "success",
      variant: "left-accent",
      position: "top-right",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Flex
        height={"60vh"}
        backgroundImage={BlogBG}
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
          In the <u>world</u> of <i style={{ fontWeight: 700 }}>pixels,</i>
          <br /> I am the <u>brushstroke</u> of{" "}
          <i style={{ fontWeight: 700 }}>innovation.</i>
        </Text>
      </Flex>
      <Container maxWidth={"90em"} py={8}>
        <Text
          fontSize={"4xl"}
          fontWeight={"700"}
          align={"center"}
          textTransform={"uppercase"}
          color={"#404D49"}
          textDecoration={"underline"}
        >
          Blogs
        </Text>
        {!!user && (
          <Flex justifyContent={"flex-end"}>
            <Button
              variant="solid"
              color="#ffffff"
              backgroundColor={"#404D49"}
              _hover={{
                backgroundColor: "#66706d",
              }}
              _active={{
                backgroundColor: "#333d3a",
              }}
              onClick={onOpen}
            >
              Add Blog
            </Button>
          </Flex>
        )}
        <Flex py={10} flexDirection={"column"} gap={8}>
          {blogList && blogList.length > 0 ? (
            blogList.map((blog) => {
              return (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  isAdmin={!!user}
                  title={blog.title}
                  created_date={blog.created_date}
                  description={blog.description}
                  setBlogDetail={setBlogDetail}
                  onOpen={onOpen}
                  handleDelete={handleDelete}
                />
              );
            })
          ) : (
            <Text>No Data Available</Text>
          )}
        </Flex>
      </Container>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setErrorMessage(defaultError);
          setBlogDetail(defaultBlog);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack
                sx={{
                  "& input:focus-visible, & textarea:focus-visible": {
                    borderColor: "#404D49",
                    boxShadow: "0 0 0 1px #404D49",
                  },
                }}
              >
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    value={blogDetail.title}
                    onChange={(event) => {
                      setBlogDetail((prev) => {
                        return { ...prev, title: event.target.value };
                      });
                    }}
                  />
                  <FormHelperText color={"#d00101"}>
                    {errorMessage.title}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={blogDetail.description}
                    onChange={(event) => {
                      setBlogDetail((prev) => {
                        return { ...prev, description: event.target.value };
                      });
                    }}
                    placeholder="Description"
                  />
                  <FormHelperText color={"#d00101"}>
                    {errorMessage.description}
                  </FormHelperText>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
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
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Blogs;
