import { useState } from "react";
import { Attribute } from "../types";

function AttributeNode(props: Attribute): JSX.Element {
  const [weighting, setWeighting] = useState(50);

  return (
    <>
      <h3>{props.name}</h3>
      <input
        type="range"
        step="10"
        value={weighting}
        onChange={(e) => setWeighting(parseInt(e.target.value))}
      />
      <h4>Weighting: {weighting / 100}</h4>
    </>
  );
}
export default AttributeNode;
