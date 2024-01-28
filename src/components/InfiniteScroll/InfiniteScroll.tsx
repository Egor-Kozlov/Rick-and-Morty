import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import type { Character } from "rickmortyapi";

type InfiniteScrollProps = {
  render: (items: Character[]) => JSX.Element[];
  children: JSX.Element;
  data: Character[] | [];
  loading: boolean;
  countOfPages: number;
  getItems: (page: number) => void;
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ render, children, data, loading, countOfPages, getItems }) => {
  const element = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const isLastPage = countOfPages === page;
  const childWithRef = React.cloneElement(children, { ref: element });

  const options = {
    rootMargin: "0px 0px 350px 0px",
    threshold: 0,
  };

  const intersectionObserver = new IntersectionObserver(async (entries) => {
    const entry = entries[0];

    if (entry.isIntersecting) {
      getItems(page);
      setPage(page + 1);
    }
  }, options);

  useEffect(() => {
    if (!isLastPage && element.current) {
      intersectionObserver.observe(element.current);
    }

    return () => {
      element.current && intersectionObserver.unobserve(element.current);
    };
  }, [data, isLastPage]);

  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"} paddingY={5} paddingX={{ base: 2, md: 8 }}>
      {data.length === 0 && loading ? (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} h={"100vh"}>
          <Spinner size="xl" />
        </Box>
      ) : (
        <SimpleGrid maxW={"794px"} spacingX="40px" spacingY="15px" columns={{ base: 1, md: 2 }}>
          {render(data)}
        </SimpleGrid>
      )}
      {!isLastPage && childWithRef}
    </Box>
  );
};

export default InfiniteScroll;
