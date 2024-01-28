import type { Character } from "rickmortyapi";

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

export default getStatusColor;
