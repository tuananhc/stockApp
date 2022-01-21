import capitalizeWord from "./capitalizeWord"

export function capitalizeString(string) {
  if (string === undefined) return
  return string.toLowerCase().split(" ").map(capitalizeWord).join(" ")
}