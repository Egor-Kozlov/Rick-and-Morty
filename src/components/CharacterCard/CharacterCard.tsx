import { Badge, Box, Card, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { memo, useState } from "react";
import type { Character } from "rickmortyapi";

type CharacterCardProps = {
  name: Character["name"];
  status: Character["status"];
  imageUrl: Character["image"];
  id: number;
  species: Character["species"];
  gender: Character["gender"];
  isSkeleton?: boolean;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ name, status, imageUrl, id, gender, species }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <Card w={"100%"} h={"150px"} direction={"row"} overflow="hidden" variant="outline">
      <Box w={"140px"} h={"100%"}>
        {/* <Fade in={isImageLoaded}> */}
        <Image
          onLoad={() => setIsImageLoaded(true)}
          w={"140px"}
          h={"150px"}
          objectFit="cover"
          src={imageUrl}
          alt={`${name}'s avatar`}
        />
        {/* </Fade>
        {!isImageLoaded && <Box w={"100%"} h={"100%"} bg={"gray.100"} position={"absolute"} zIndex={50} />} */}
      </Box>
      <VStack p={3} flexGrow={1}>
        <HStack w={"100%"} borderRadius="md" justifyContent={"space-between"}>
          <Text as="span" fontWeight="bold" fontSize={"xs"}>
            #{id}
          </Text>
          <Badge colorScheme={status === "Alive" ? "green" : status === "Dead" ? "red" : "gray"}>{status}</Badge>
        </HStack>

        <VStack w={"100%"} h={"100%"} alignItems={"start"} justifyContent={"space-between"} gap={"5px"}>
          <Heading minH={5} size="s">
            {name}
          </Heading>

          <VStack w={"100%"} alignItems={"flex-start"} gap={0}>
            <HStack>
              <Text fontSize="xs">
                <Text as="span" fontWeight="bold">
                  Species:
                </Text>{" "}
                {species}
              </Text>
            </HStack>
            <HStack>
              <Text fontSize="xs">
                <Text as="span" fontWeight="bold">
                  Gender:
                </Text>{" "}
                {gender}
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </Card>
  );
};

// export default CharacterCard;

export default memo(CharacterCard);
