import InfiniteScroll from "@app-components/InfiniteScroll";
import SmthWentWrong from "@app-components/SmthWentWrong";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";

// to reset scroll position on page reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

function App() {
  const [error, setError] = useState(false);

  return <ChakraProvider>{error ? <SmthWentWrong /> : <InfiniteScroll setError={setError} />}</ChakraProvider>;
}

export default App;
