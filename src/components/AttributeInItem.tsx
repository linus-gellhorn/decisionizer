import { useState, useContext } from "react";
import { AttributeInItemProps } from "../types";
import { ItemAttributePairsContext } from "./MainContent";

export default function AttributeInItem(props: AttributeInItemProps) {
  const itemAttributePairs = useContext(ItemAttributePairsContext);

  const ItemIndex = itemAttributePairs.findIndex(
    (pair) => pair.attributeId === props.id && pair.itemId === props.itemId
  );
  const initialAttributeValue = itemAttributePairs[ItemIndex].value;
  const [attributeInItemValue, setAttributeInItemValue] = useState(
    initialAttributeValue
  );

  return (
    <>
      <p>
        {props.name}: {attributeInItemValue}
      </p>
      <input
        type="range"
        step="1"
        value={attributeInItemValue}
        onChange={(e) => setAttributeInItemValue(parseInt(e.target.value))}
        onMouseEnter={() => {
          props.handleAttributeInItemSlider(props.id, attributeInItemValue);
        }}
        onMouseLeave={() => {
          props.handleAttributeInItemSlider(props.id, attributeInItemValue);
        }}
      />
    </>
  );
}
