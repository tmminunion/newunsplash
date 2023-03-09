import seedrandom from "seedrandom";

export default function generateRandomString(inputString) {
  let outputString = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  // Set seed based on input string
  const rng = seedrandom(inputString);

  for (let i = 0; i < inputString.length; i++) {
    const randomIndex = Math.floor(rng() * characters.length);
    outputString += characters.charAt(randomIndex);
  }

  return outputString;
}
