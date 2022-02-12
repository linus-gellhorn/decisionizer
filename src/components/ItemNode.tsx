import { Attribute, ItemAttributePair, Item } from "../types";
import AttributeInItem from "./AttributeInItem";
import { useState, useEffect } from "react";
import sumWeightedAttributes from "../utils/sumWeightedAttributes";

interface ItemNodeProps {
  name: string;
  attributes: Attribute[];
  itemAttributePairs: ItemAttributePair[];
  setItemAttributePairs: React.Dispatch<
    React.SetStateAction<ItemAttributePair[]>
  >;
  itemId: string;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

function ItemNode(props: ItemNodeProps): JSX.Element {
  const [itemTotal, setItemTotal] = useState(0);

  const itemAttributePairs = props.itemAttributePairs;
  const setItems = props.setItems;

  useEffect(() => {
    // sumWeightedAttributes();

    const total = sumWeightedAttributes(props.attributes);
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
  }, [itemAttributePairs, props.attributes, props.itemId, setItems]);

  // console.log(props.attributes);
  return (
    <>
      <h3>{props.name}</h3>
      {props.attributes.map((attribute) => (
        <AttributeInItem
          key={attribute.id}
          id={attribute.id}
          name={attribute.name}
        />
      ))}
      <h3>Total: {itemTotal}</h3>
    </>
  );
}
export default ItemNode;
