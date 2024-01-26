import { Box, Image, Stack, Text } from "@chakra-ui/react";

const CharacterCard = ({ name, status, imageUrl, index }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={imageUrl} alt={name} />

      <Box p="6">
        <Stack spacing={0} align="center" mb={5}>
          <Text fontSize="xl" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="md" color="gray.500">
            {status}
          </Text>
        </Stack>

        <Stack spacing={0} align="center">
          <Text fontSize="md" color="gray.500">
            {index}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default CharacterCard;
