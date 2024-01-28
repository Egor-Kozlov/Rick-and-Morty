import { Box, ChakraProvider } from "@chakra-ui/react";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import InfiniteScroll from "./components/InfiniteScroll/InfiniteScroll";
import useGetRickAndMorty from "./hooks/useGetRickAndMorty";

// for reset scroll position on page reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

function App() {
  const { characters, loading, countOfPages, charactersRequest } = useGetRickAndMorty();

  return (
    <ChakraProvider>
      <InfiniteScroll
        getItems={charactersRequest}
        countOfPages={countOfPages}
        data={characters}
        loading={loading}
        render={(items) => {
          const readyItems = items.map((item) => (
            <CharacterCard
              key={item.id}
              name={item.name}
              id={item.id}
              imageUrl={item.image}
              status={item.status}
              gender={item.gender}
              species={item.species}
            />
          ));
          // const skeletonItems = Array.from({ length: 10 }).map((_, index) => <CharacterCard key={`sk${index}`} isSkeleton />);

          // return readyItems.concat(skeletonItems) as unknown as JSX.Element;
          // return [...readyItems, ...skeletonItems];
          return readyItems;
        }}
      >
        {/* it's observable component, which can be anything. This was has better performance, than subscribe to the card in list every time */}
        <Box opacity={0} />
      </InfiniteScroll>
    </ChakraProvider>
  );
}

export default App;
