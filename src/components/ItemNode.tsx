interface ItemNodeProps {
  name: string;
}

function ItemNode(props: ItemNodeProps): JSX.Element {
  return (
    <>
      <h3>{props.name}</h3>
      <h4>Value: </h4>
    </>
  );
}
export default ItemNode;
