interface AttributeNodeProps {
  name: string;
  weighting: number;
}

function AttributeNode(props: AttributeNodeProps): JSX.Element {
  return (
    <>
      <h3>{props.name}</h3>
      <h4>Weighting: {props.weighting}</h4>
    </>
  );
}
export default AttributeNode;
