import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Stack from "./Stack";

const TriggerBox = () => {
  return <Box h={"1px"} w={"1px"} opacity={0} />;
};

type InfiniteScrollProps = {
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ setError }) => {
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState<null | number>(null);

  const onChangeMaxPage = useCallback(
    (newMaxPage: number) => {
      setMaxPage(newMaxPage);
    },
    [setMaxPage]
  );

  const onError = useCallback(
    (value: boolean) => {
      setError(value);
    },
    [setError]
  );

  const bottomElement = useRef<HTMLDivElement>(null);
  const bottomTriggerRef = React.cloneElement(TriggerBox(), {
    ref: bottomElement,
  });

  const [stacks, setStacks] = useState<React.JSX.Element[]>([]);

  //how much pixels from bottom of the page should be to add new items
  const options = {
    rootMargin: "0px 0px 0px 0px",
    threshold: 0,
  };

  const intersectionObserver = new IntersectionObserver(async (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setPage((prev) => {
        return prev + 1;
      });
    }
  }, options);

  useEffect(() => {
    if (bottomElement.current) {
      intersectionObserver.observe(bottomElement.current);
    }

    return () => {
      bottomElement.current && intersectionObserver.unobserve(bottomElement.current);
    };
  }, []);

  useEffect(() => {
    if (page !== maxPage) {
      //remove all stack except last one
      setStacks((prev) => [
        ...prev.slice(-1),
        <Stack key={page} pageToLoad={page} setMaxPage={onChangeMaxPage} setError={onError} />,
      ]);
    } else if (page === maxPage) {
      setPage(1);
    }
  }, [page]);

  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"} paddingY={5} paddingX={{ base: 2, md: 8 }}>
      <SimpleGrid maxW={"794px"} spacingX="40px" spacingY="15px" columns={{ base: 1, md: 2 }}>
        {stacks}
      </SimpleGrid>

      {stacks.length === 0 && (
        <Box zIndex={100} position={"absolute"} display={"flex"} alignItems={"center"} justifyContent={"center"} h={"100vh"}>
          <Spinner size="xl" />
        </Box>
      )}

      {bottomTriggerRef}
    </Box>
  );
};

export default InfiniteScroll;
