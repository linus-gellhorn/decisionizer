import { Attribute, ItemAttributePair } from "../types";

function calculateWeightedAttributes(
  attributeId: string,
  itemAttributePairs: ItemAttributePair[],
  attributes: Attribute[],
  itemId: string
) {
  const value =
    itemAttributePairs[
      itemAttributePairs.findIndex(
        (pair) => pair.itemId === itemId && pair.attributeId === attributeId
      )
    ].value;
  const weighting =
    attributes[
      attributes.findIndex((attribute) => attribute.id === attributeId)
    ].weighting;
  const weightedValue = value * weighting;
  return weightedValue;
}

export default function sumWeightedAttributes(attributes: Attribute[]) {
  let sum = 0;
  for (let attribute of attributes) {
    // sum += calculateWeightedAttributes(attribute.id, attribute., itemId);
  }
  return sum;
}
