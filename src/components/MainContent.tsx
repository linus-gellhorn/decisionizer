import ReactFlow from "react-flow-renderer";
import AttributeNode from "./AttributeNode";
import { useState } from "react";
import { Attribute, Item } from "../types";
import ItemNode from "./ItemNode";

function MainContent() {
  const winningItem = {
    id: "0",
    type: "output",
    data: { label: "Winner" },
    position: { x: 400, y: 30 },
  };

  const [id, setId] = useState(1);
  const [elements, setElements] = useState<any[]>([winningItem]);
  const [attributeName, setAttributeName] = useState("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  function handleCreateAttributeNode() {
    const newId = (id + 1).toString();
    setId(id + 1);

    const element = {
      id: newId,
      type: "input",
      data: {
        label: (
          <AttributeNode
            name={attributeName}
            id={newId}
            weighting={0.5} // placeholder
          />
        ),
      },
      position: {
        x: 100 + attributes.length * 250,
        y: 100,
      },
    };

    const attribute = {
      id: newId,
      name: attributeName,
      weighting: 0.5,
    };

    setElements([...elements, element]);
    setAttributes([...attributes, attribute]);
    setAttributeName("");
    // console.log(elements);
    // console.log(attributes);
    // console.log(id);
  }

  function handleCreateItemNode() {
    const newId = (id + 1).toString();
    setId(id + 1);

    const element = {
      id: newId,
      data: {
        label: <ItemNode name={itemName} />,
      },
      position: {
        x: 100 + items.length * 250,
        y: 300,
      },
    };

    const item = {
      id: newId,
      name: itemName,
      total: 100, // placeholder
    };

    setElements([...elements, element]);
    setItemName("");
    setItems([...items, item]);
  }

  const flowStyles = { height: 600 };

  return (
    <>
      <div className="options">
        <h2>What attributes do you value?</h2>
        <input
          type="text"
          value={attributeName}
          onChange={(e) => setAttributeName(e.target.value)}
          placeholder="E.g. Tastiness"
        />
        <button onClick={() => handleCreateAttributeNode()}>Submit</button>
        <h2>What items do you want to compare?</h2>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="E.g. Pizza"
        />
        <button onClick={() => handleCreateItemNode()}>Submit</button>
      </div>
      <br />
      <div className="flowchart">
        <ReactFlow elements={elements} style={flowStyles} />
      </div>
    </>
  );
}

export default MainContent;

// const elements = [
//   {
//     id: "1",
//     type: "input",
//     data: {
//       label: (
//         <AttributeNode
//           name={attributes[0].attribute}
//           weighting={attributes[0].weighting}
//         />
//       ),
//     },
//     position: { x: 300, y: 5 },
//   },
//   {
//     id: "2",
//     data: {
//       label: (
//         <ItemNode
//           name={items[0].name}
//           healthiness={items[0].healthiness}
//           tastiness={items[0].tastiness}
//         />
//       ),
//     },
//     position: { x: 300, y: 200 },
//   },
//   { id: "e1-2", source: "1", target: "2", animated: true },
//   { id: "e1-4", source: "1", target: "4", animated: true },
//   {
//     id: "3",
//     type: "input",
//     data: {
//       label: (
//         <AttributeNode
//           name={attributes[1].attribute}
//           weighting={attributes[1].weighting}
//         />
//       ),
//     },
//     position: { x: 500, y: 5 },
//   },
//   {
//     id: "4",
//     data: {
//       label: (
//         <ItemNode
//           name={items[1].name}
//           healthiness={items[1].healthiness}
//           tastiness={items[1].tastiness}
//         />
//       ),
//     },
//     position: { x: 500, y: 200 },
//   },
//   { id: "e3-4", source: "3", target: "4", animated: true },
//   { id: "e3-2", source: "3", target: "2", animated: true },
//   {
//     id: "5",
//     type: "output",
//     data: { label: "Winner: ?" },
//     position: { x: 400, y: 400 },
//   },
//   { id: "e2-5", source: "2", target: "5", animated: true },
//   { id: "e4-5", source: "4", target: "5", animated: true },
// ];
