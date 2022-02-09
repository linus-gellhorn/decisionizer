import ReactFlow from "react-flow-renderer";
import { items, attributes } from "./dummyData";
import AttributeNode from "./AttributeNode";
import ItemNode from "./ItemNode";

function MainContent() {
  const elements = [
    {
      id: "1",
      type: "input",
      data: {
        label: (
          <AttributeNode
            name={attributes[0].attribute}
            weighting={attributes[0].weighting}
          />
        ),
      },
      position: { x: 300, y: 5 },
    },
    {
      id: "2",
      data: {
        label: (
          <ItemNode
            name={items[0].name}
            healthiness={items[0].healthiness}
            tastiness={items[0].tastiness}
          />
        ),
      },
      position: { x: 300, y: 200 },
    },
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-4", source: "1", target: "4", animated: true },
    {
      id: "3",
      type: "input",
      data: {
        label: (
          <AttributeNode
            name={attributes[1].attribute}
            weighting={attributes[1].weighting}
          />
        ),
      },
      position: { x: 500, y: 5 },
    },
    {
      id: "4",
      data: {
        label: (
          <ItemNode
            name={items[1].name}
            healthiness={items[1].healthiness}
            tastiness={items[1].tastiness}
          />
        ),
      },
      position: { x: 500, y: 200 },
    },
    { id: "e3-4", source: "3", target: "4", animated: true },
    { id: "e3-2", source: "3", target: "2", animated: true },
    {
      id: "5",
      data: { label: "Winner: ?" },
      position: { x: 400, y: 400 },
    },
    { id: "e2-5", source: "2", target: "5", animated: true },
    { id: "e4-5", source: "4", target: "5", animated: true },
  ];

  const flowStyles = { height: 600 };

  return (
    <>
      <ReactFlow elements={elements} style={flowStyles} />
    </>
  );
}

export default MainContent;
