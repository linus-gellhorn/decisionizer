import { useState } from "react";
import { AttributeInItemProps } from "../types";

export default function AttributeInItem(props: AttributeInItemProps) {
  const [attributeInItemValue, setAttributeInItemValue] = useState(50);

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
