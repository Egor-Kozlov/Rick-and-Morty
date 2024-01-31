import ImagePlaceholder from "@app-assets/images/person-placeholder.jpg";
import { Badge, Box, Card, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { FC, memo } from "react";
import type { Character } from "rickmortyapi";

type CharacterCardProps = {
  character?: Character;
  isEmptyCard?: boolean;
};

const getStatusColor = (character: Character) => {
  switch (character.status) {
    case "Alive":
      return "green";
    case "Dead":
      return "red";
    default:
      return "gray";
  }
};

const CharacterCard: FC<CharacterCardProps> = ({ character, isEmptyCard }) => {
  if (isEmptyCard) {
    return (
      <Card w={"340px"} h={"150px"} direction={"row"} overflow="hidden" variant="outline">
        <Box w={"100%"} h={"100%"} bg={"gray.100"} position={"absolute"} zIndex={50} top={0} />
      </Card>
    );
  }

  const { image, name, id, status, species, gender } = character as Character;

  const CardHeader = () => {
    return (
      <HStack w={"100%"} borderRadius="md" justifyContent={"space-between"}>
        <Text as="span" fontWeight="bold" fontSize={"xs"}>
          #{id || "Unknown"}
        </Text>
        <Badge colorScheme={character && getStatusColor(character)}>{status}</Badge>
      </HStack>
    );
  };

  const CardBody = () => {
    return (
      <VStack w={"100%"} alignItems={"flex-start"} gap={0}>
        <HStack>
          <Text fontSize="xs" flexWrap="wrap">
            <Text as="span" fontWeight="bold">
              Species:
            </Text>{" "}
            {species || "Unknown"}
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="xs">
            <Text as="span" fontWeight="bold">
              Gender:
            </Text>{" "}
            {gender || "Unknown"}
          </Text>
        </HStack>
      </VStack>
    );
  };

  return (
    <Card w={"340px"} h={"150px"} direction={"row"} overflow="hidden" variant="outline">
      <Image w={"140px"} h={"150px"} objectFit="cover" src={image || ImagePlaceholder} alt={`${name}'s avatar`} />
      <VStack p={3} gap={0} flex={1}>
        <CardHeader />
        <VStack w={"100%"} h={"100%"} alignItems={"start"} justifyContent={"space-between"} gap={"5px"}>
          <Heading minH={5} size="s">
            {name || "Unknown"}
          </Heading>
          <CardBody />
        </VStack>
      </VStack>
    </Card>
  );
};

const MemoComponent = memo(CharacterCard);
export default MemoComponent;
