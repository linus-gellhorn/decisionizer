interface ItemNodeProps {
  name: string;
  healthiness: number;
  tastiness: number;
}

function ItemNode(props: ItemNodeProps): JSX.Element {
  return (
    <>
      <h3>{props.name}</h3>
      <h4>Healthiness: {props.healthiness}</h4>
      <h4>Tastiness: {props.tastiness}</h4>
    </>
  );
}
export default ItemNode;
