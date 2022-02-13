import ReactFlow from "react-flow-renderer";
import AttributeNode from "./AttributeNode";
import React, { useState, useEffect } from "react";
import { Attribute, Item, ItemAttributePair, Edge } from "../types";
import ItemNode from "./ItemNode";
import findWinner from "../utils/findWinner";
import createEdge from "../utils/createEdge";

export const AttributesContext = React.createContext<Attribute[]>([]);
export const ItemAttributePairsContext = React.createContext<
  ItemAttributePair[]
>([]);

// function WinningNode(props: {
//   winner: string;
//   setWinner: React.Dispatch<React.SetStateAction<string>>;
// }) {
//   useEffect(() => {
//     props.setWinner(props.winner);
//   }, [props.winner]);
//   return (
//     <>
//       <h3>{props.winner}</h3>
//     </>
//   );
// }

function MainContent() {
  const [winner, setWinner] = useState("");
  // need to place this node above elements useState but below winning state
  const winningNode = {
    id: "0",
    type: "output",
    data: { label: "Winner" },
    // data: { label: <WinningNode winner={winner} setWinner={setWinner} /> },
    position: { x: 400, y: 550 },
  };

  const [id, setId] = useState(1);
  const [elements, setElements] = useState<any[]>([winningNode]);
  const [attributeName, setAttributeName] = useState("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [itemAttributePairs, setItemAttributePairs] = useState<
    ItemAttributePair[]
  >([]);

  useEffect(() => {
    if (items.length >= 2) {
      let winningItem = findWinner(items);
      console.log(winningItem);
      setWinner(winningItem);
    }
  }, [items, setWinner]);

  // console.log(items);

  function addEdges(id: string) {
    const attributeItemEdges: Edge[] = [];
    const itemOutputEdges: Edge[] = [];
    for (let element of elements) {
      if (element.type === "output")
        itemOutputEdges.push(
          createEdge(id, element.id, { stroke: "red" }, true)
        );

      if (element.type === "input")
        attributeItemEdges.push(
          createEdge(element.id, id, { stroke: "blue" }, false)
        );
    }
    const newEdges = [...attributeItemEdges, ...itemOutputEdges];
    setElements((arr) => arr.concat(newEdges));
    // setElements([...elements, ...attributeItemEdges, ...itemOutputEdges]);
  }

  function addNewItemAttributePairs(attributeId: string) {
    const arrOfItemIds = elements
      .filter((element) => element.type === "default")
      .map((element) => element.id);
    for (let itemId of arrOfItemIds) {
      setItemAttributePairs((arr) =>
        arr.concat({ itemId: itemId, attributeId: attributeId, value: 50 })
      );
    }
  }

  function addNewPairsAttribute(itemId: string) {
    const arrOfAttributeIds = elements
      .filter((element) => element.type === "input")
      .map((element) => element.id);
    for (let attributeId of arrOfAttributeIds) {
      setItemAttributePairs((arr) =>
        arr.concat({ itemId: itemId, attributeId: attributeId, value: 50 })
      );
    }
  }

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
            handleAttributeSlider={handleAttributeSlider}
          />
        ),
      },
      position: {
        x: 100 + attributes.length * 250,
        y: 50,
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
    addNewItemAttributePairs(newId);

    // console.log(elements);
    // console.log(attributes);
    // console.log(id);
  }

  function handleCreateItemNode() {
    const newId = (id + 1).toString();
    setId(id + 1);

    const element = {
      id: newId,
      type: "default",
      data: {
        label: (
          <ItemNode
            name={itemName}
            // attributes={attributes}
            itemAttributePairs={itemAttributePairs}
            setItemAttributePairs={setItemAttributePairs}
            itemId={newId}
            setItems={setItems}
          />
        ),
      },
      position: {
        x: 100 + items.length * 250,
        y: 250,
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
    addNewPairsAttribute(newId);
    addEdges(newId);
  }

  function handleAttributeSlider(id: string, newWeighting: number) {
    setAttributes((arr) => {
      const newArr = [...arr];
      for (let attribute of newArr) {
        if (attribute.id === id) {
          const updatedAtt = {
            ...attribute,
            weighting: newWeighting,
          };
          newArr[newArr.indexOf(attribute)] = updatedAtt;
        }
      }
      return newArr;
    });
  }

  const flowStyles = { height: 700 };

  return (
    <>
      <div className="options">
        <div className="attributes">
          <h2>1. What attributes do you value?</h2>
          <input
            type="text"
            value={attributeName}
            onChange={(e) => setAttributeName(e.target.value)}
            placeholder="E.g. Tastiness"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                console.log("pressed");
                handleCreateAttributeNode();
              }
            }}
          />
          <button onClick={() => handleCreateAttributeNode()}>Submit</button>
        </div>
        <div className="items">
          <h2>2. What items do you want to compare?</h2>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="E.g. Pizza"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                console.log("pressed");
                handleCreateItemNode();
              }
            }}
          />
          <button onClick={() => handleCreateItemNode()}>Submit</button>
        </div>
      </div>
      <br />
      <p>Winner: {winner}</p>
      <div className="flowchart">
        <AttributesContext.Provider value={attributes}>
          <ItemAttributePairsContext.Provider value={itemAttributePairs}>
            <ReactFlow elements={elements} style={flowStyles} />
          </ItemAttributePairsContext.Provider>
        </AttributesContext.Provider>
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
