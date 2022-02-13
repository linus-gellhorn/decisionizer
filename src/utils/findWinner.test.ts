import findWinner from "./findWinner";

export default test("Pick the winning item and return it's name", () => {
  const item1 = {
    id: "1",
    name: "pizza",
    total: 123,
  };

  const item2 = {
    id: "2",
    name: "chocolate",
    total: 145,
  };

  const item3 = {
    id: "3",
    name: "coke",
    total: 145,
  };

  const itemListWithWinner = [item1, item2];
  const itemListDrawing = [item1, item2, item3];

  expect(findWinner(itemListWithWinner)).toStrictEqual("chocolate");
  expect(findWinner(itemListDrawing)).toStrictEqual(
    "Draw between chocolate and coke!"
  );
});
