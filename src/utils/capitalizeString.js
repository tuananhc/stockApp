import capitalizeWord from "./capitalizeWord"

export function capitalizeString(string) {
  return string.toLowerCase().split(" ").map(capitalizeWord).join(" ")
}