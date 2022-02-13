import { useState } from "react";
import { AttributeNodeProps } from "../types";

function AttributeNode(props: AttributeNodeProps): JSX.Element {
  const [weighting, setWeighting] = useState(50);

  props.handleAttributeSlider(props.id, weighting);

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
