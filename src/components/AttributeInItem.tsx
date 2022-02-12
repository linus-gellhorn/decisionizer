import { useState } from "react";
import { AttributeInItemProps } from "../types";

export default function AttributeInItem(props: AttributeInItemProps) {
  const ItemIndex = props.itemAttributePairs.findIndex(
    (pair) => pair.attributeId === props.id && pair.itemId === props.itemId
  );
  const initialAttributeValue = props.itemAttributePairs[ItemIndex].value;
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
      />
    </>
  );
}
