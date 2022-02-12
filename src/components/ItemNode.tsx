import { Attribute, ItemAttributePair, Item } from "../types";
import AttributeInItem from "./AttributeInItem";
import { useState, useEffect, useContext } from "react";
import { AttributesContext, ItemAttributePairsContext } from "./MainContent";

interface ItemNodeProps {
  name: string;
  // attributes: Attribute[];
  itemAttributePairs: ItemAttributePair[];
  setItemAttributePairs: React.Dispatch<
    React.SetStateAction<ItemAttributePair[]>
  >;
  itemId: string;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

function ItemNode(props: ItemNodeProps): JSX.Element {
  const [itemTotal, setItemTotal] = useState(0);
  const itemAttributePairs = useContext(ItemAttributePairsContext);
  const attributes = useContext(AttributesContext);
  // const itemAttributePairs = props.itemAttributePairs;
  const setItems = props.setItems;

  useEffect(() => {
    function calculateWeightedAttributes(attributeId: string) {
      const value =
        itemAttributePairs[
          itemAttributePairs.findIndex(
            (pair) =>
              pair.itemId === props.itemId && pair.attributeId === attributeId
          )
        ].value;
      const weighting =
        attributes[
          attributes.findIndex((attribute) => attribute.id === attributeId)
        ].weighting / 100;
      const weightedValue = value * weighting;
      console.log(weighting, value);
      return weightedValue;
    }

    function sumWeightedAttributes(attributes: Attribute[]) {
      let sum = 0;
      for (let attribute of attributes) {
        sum += calculateWeightedAttributes(attribute.id);
      }
      return sum;
    }

    const total = sumWeightedAttributes(attributes);
    setItemTotal(total);
    setItems((arr) => {
      const copyArr = [...arr];
      for (let el of copyArr) {
        if (el.id === props.itemId) {
          const newTotal = {
            ...el,
            total: total,
          };
          copyArr[copyArr.indexOf(el)] = newTotal;
        }
      }
      return copyArr;
    });
  }, [itemAttributePairs, attributes, props.itemId, setItems]);

  function handleAttributeInItemSlider(id: string, selectedValue: number) {
    props.setItemAttributePairs((arr) => {
      const newArr = [...arr];
      for (let element of newArr) {
        if (element.attributeId === id && element.itemId === props.itemId) {
          const newChoice = {
            ...element,
            value: selectedValue,
          };
          newArr[newArr.indexOf(element)] = newChoice;
        }
      }
      return newArr;
    });
  }

  console.log(attributes);
  return (
    <>
      <h3>{props.name}</h3>
      {attributes.map((attribute) => (
        <AttributeInItem
          key={attribute.id}
          id={attribute.id}
          name={attribute.name}
          itemId={props.itemId}
          handleAttributeInItemSlider={handleAttributeInItemSlider}
        />
      ))}
      <h3>Total: {Math.round(itemTotal * 10) / 10}</h3>
    </>
  );
}
export default ItemNode;
