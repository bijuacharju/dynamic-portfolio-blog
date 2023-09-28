import { Box, Container, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogArticle = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  useEffect(() => {
    const storedData =
      localStorage.getItem("blog_list") &&
      JSON.parse(localStorage.getItem("blog_list")).length > 0
        ? JSON.parse(localStorage.getItem("blog_list"))
        : [];
    if (storedData.length > 0) {
      setBlog(storedData.find((x) => x.id.toString() === id));
    }
  }, [id]);
  return (
    <Box>
      <Container maxWidth={"90em"} py={8}>
        <Text
          fontSize={"4xl"}
          fontWeight={"700"}
          align={"center"}
          textTransform={"uppercase"}
          color={"#404D49"}
          textDecoration={"underline"}
        >
          {blog?.title}
        </Text>
        <Text align={"right"} fontSize={"xs"} opacity={0.8} fontWeight={700}>
          Published Date: {new Date(blog?.created_date).toDateString()}
        </Text>
        <Text fontSize={"md"}>{blog?.description}</Text>
      </Container>
    </Box>
  );
};

export default BlogArticle;
