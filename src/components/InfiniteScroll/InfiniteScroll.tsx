import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
type InfiniteScrollProps = {
  countOfItems: number;
  countOfPages: number;
  getItems: (page: number) => Promise<any>;
  render: (data: any) => JSX.Element;
  children: JSX.Element;
  data: any;
  loading: boolean;
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  render,
  children,
  data,
  loading,
  countOfPages,
  countOfItems,
  getItems,
}) => {
  const element = useRef(null);
  const [page, setPage] = useState(1);
  const isLastPage = countOfPages === page;
  const childWithRef = React.cloneElement(children, { ref: element });

  const intersectionObserver = new IntersectionObserver(async (entries) => {
    const entry = entries[0];

    if (entry.isIntersecting) {
      getItems(page);
      setPage(page + 1);
    }
  });

  useEffect(() => {
    if (!isLastPage) {
      intersectionObserver.observe(element.current);
    }

    return () => {
      element.current && intersectionObserver.unobserve(element.current);
    };
  }, [data, isLastPage]);

  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"} paddingY={40}>
      <SimpleGrid maxW={"1336px"} columns={2} spacingX="40px" spacingY="20px">
        {data && render(data)}
        {!isLastPage && childWithRef}
      </SimpleGrid>
    </Box>
  );
};

export default InfiniteScroll;
