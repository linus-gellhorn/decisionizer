import { Attribute } from "../types";
import AttributeInItem from "./AttributeInItem";

interface ItemNodeProps {
  name: string;
  attributes: Attribute[];
}

function ItemNode(props: ItemNodeProps): JSX.Element {
  console.log(props.attributes);
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
      <h3>Total: </h3>
    </>
  );
}
export default ItemNode;
