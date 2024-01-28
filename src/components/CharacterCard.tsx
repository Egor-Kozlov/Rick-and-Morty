import ImagePlaceholder from "@app-assets/images/person-placeholder.jpg";
import getStatusColor from "@app-utils/getStatusColor";
import { Badge, Box, Card, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { memo, useState } from "react";
import type { Character } from "rickmortyapi";

type CharacterCardProps = {
  character: Character;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { image, name, id, status, species, gender } = character;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const CardHeader = () => {
    return (
      <HStack w={"100%"} borderRadius="md" justifyContent={"space-between"}>
        <Text as="span" fontWeight="bold" fontSize={"xs"}>
          #{id || "Unknown"}
        </Text>
        <Badge colorScheme={getStatusColor(character)}>{status}</Badge>
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
    <Card w={"100%"} h={"150px"} direction={"row"} overflow="hidden" variant="outline">
      <Image
        onLoad={() => setIsImageLoaded(true)}
        w={"140px"}
        h={"150px"}
        objectFit="cover"
        src={image || ImagePlaceholder}
        alt={`${name}'s avatar`}
      />
      <VStack p={3} gap={0} flex={1}>
        <CardHeader />
        <VStack w={"100%"} h={"100%"} alignItems={"start"} justifyContent={"space-between"} gap={"5px"}>
          <Heading minH={5} size="s">
            {name || "Unknown"}
          </Heading>
          <CardBody />
        </VStack>
      </VStack>
      {!isImageLoaded && <Box w={"100%"} h={"100%"} bg={"gray.100"} position={"absolute"} zIndex={50} top={0} />}
    </Card>
  );
};

const MemoComponent = memo(CharacterCard);
export default MemoComponent;
