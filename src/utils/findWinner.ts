import { Item } from "../types";

export default function findWinner(items: Item[]) {
  const first = items.sort((a, b) => b.total - a.total)[0];
  const second = items.sort((a, b) => b.total - a.total)[1];
  if (first.total === second.total)
    return `Draw between ${first.name} and ${second.name}!`;
  return first.name;
}
