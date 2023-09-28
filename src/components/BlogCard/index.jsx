import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({
  id,
  title,
  created_date,
  description,
  isAdmin,
  setBlogDetail,
  onOpen,
  handleDelete,
}) => {
  return (
    <Link to={`/blogs/${id}`}>
      <Box
        border={"1px solid #404D49"}
        borderRadius={"lg"}
        p={4}
        transition={"all 0.25s ease-in-out"}
        _hover={{ boxShadow: "0px 1px 10px 1px #404d49", cursor: "pointer" }}
      >
        <Flex alignItems={"baseline"} justifyContent={"space-between"}>
          <Box>
            <Text
              fontSize={"lg"}
              fontWeight={"bold"}
              color={"#404D49"}
              textDecoration={"underline"}
            >
              {title}
            </Text>
            <Text
              fontSize={"xs"}
              textTransform={"uppercase"}
              opacity={0.8}
              fontWeight={700}
            >
              {new Date(created_date).toDateString()}
            </Text>
          </Box>
          {isAdmin === true && (
            <Flex gap={4}>
              <Button
                variant={"outline"}
                borderColor={"#404D49"}
                transition={"all 0.25s ease-in-out"}
                _hover={{ backgroundColor: "#404D49", color: "#ffffff" }}
                _active={{
                  backgroundColor: "#333d3a",
                }}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setBlogDetail({
                    id: id,
                    title: title,
                    description: description,
                    created_date: created_date,
                  });
                  onOpen();
                }}
              >
                Edit
              </Button>
              <Button
                variant={"outline"}
                borderColor={"#d00101"}
                transition={"all 0.25s ease-in-out"}
                _hover={{ backgroundColor: "#d00101", color: "#ffffff" }}
                _active={{ backgroundColor: "#bb0000" }}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleDelete(id);
                }}
              >
                Delete
              </Button>
            </Flex>
          )}
        </Flex>
        <Text mt={4} fontSize={"sm"}>
          {`${description.split(" ").slice(0, 20).join(" ")} ${
            description.split(" ").length > 20 ? "..." : ""
          }`}
        </Text>
      </Box>
    </Link>
  );
};

export default BlogCard;
