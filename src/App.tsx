import CharacterCard from "@app-components/CharacterCard";
import InfiniteScroll from "@app-components/InfiniteScroll";
import SmthWentWrong from "@app-components/SmthWentWrong";
import useGetRickAndMorty from "@app-hooks/useGetRickAndMorty";
import { Box, ChakraProvider } from "@chakra-ui/react";

// to reset scroll position on page reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

function App() {
  const { characters, loading, countOfPages, error, charactersRequest } = useGetRickAndMorty();

  return (
    <ChakraProvider>
      {error ? (
        <SmthWentWrong />
      ) : (
        <InfiniteScroll
          getItems={charactersRequest}
          countOfPages={countOfPages}
          data={characters}
          loading={loading}
          render={(characters) => characters.map((character) => <CharacterCard key={character.id} character={character} />)}
        >
          {/* it's observable component, which can be anything. This was has better performance, than subscribe to the card in list every time */}
          <Box opacity={0} />
        </InfiniteScroll>
      )}
    </ChakraProvider>
  );
}

export default App;
