import { Badge, Card, CardBody, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { memo } from "react";
import type { Character } from "rickmortyapi";

type CharacterCardProps = {
  name: Character["name"];
  status: Character["status"];
  imageUrl: Character["image"];
  index: number;
  species: Character["species"];
  gender: Character["gender"];
};

const CharacterCard: React.FC<CharacterCardProps> = ({ name, status, imageUrl, index, gender, species }) => {
  return (
    <Card maxW={"400px"} maxH={"200px"} direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline">
      <Image objectFit="cover" src={imageUrl} alt="Caffe Latte" w={"100%"} h={"100%"} />

      <Stack w={"100%"}>
        <CardBody>
          <HStack w={"auto"} justifyContent={"space-between"} alignItems={"center"}>
            <Text as="span" fontWeight="bold">
              #{index}
            </Text>
            <Badge colorScheme={status === "Alive" ? "green" : status === "Dead" ? "red" : "gray"}>{status}</Badge>
          </HStack>

          <Heading h={20} size="sm">
            {name}
          </Heading>
          <HStack>
            <Text fontSize="sm">
              <Text as="span" fontWeight="bold">
                Species:
              </Text>{" "}
              {species}
            </Text>
          </HStack>
          <HStack>
            <Text fontSize="sm">
              <Text as="span" fontWeight="bold">
                Gender:
              </Text>{" "}
              {gender}
            </Text>
          </HStack>
        </CardBody>
      </Stack>
    </Card>
  );
};

//memo here isn't necessary in our case, when all cards are very lightweight
export default memo(CharacterCard);
