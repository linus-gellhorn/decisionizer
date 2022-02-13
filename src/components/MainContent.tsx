import ReactFlow from "react-flow-renderer";
import AttributeNode from "./AttributeNode";
import ItemNode from "./ItemNode";
import WinningNode from "./WinningNode";
import React, { useState, useEffect, useReducer, ChangeEvent } from "react";
import { Attribute, Item, ItemAttributePair, Edge } from "../types";
import findWinner from "../utils/findWinner";
import createEdge from "../utils/createEdge";
import { initialItemName, itemNameReducer } from "../utils/itemNameReducer";

export const AttributesContext = React.createContext<Attribute[]>([]);
export const ItemAttributePairsContext = React.createContext<
  ItemAttributePair[]
>([]);

function MainContent() {
  const [itemName, itemDispatch] = useReducer(itemNameReducer, initialItemName);

  const handleItemInput = (event: ChangeEvent<HTMLInputElement>) => {
    itemDispatch({
      type: "update",
      payload: event.target.value,
    });
  };
  const handleResetItem = () => {
    itemDispatch({
      type: "resetItem",
    });
  };

  const [winner, setWinner] = useState("");
  // need to place this node above elements useState but below winning state
  const winningNode = {
    id: "0",
    type: "output",
    data: { label: <WinningNode winner={winner} /> },
    position: { x: 400, y: 550 },
  };

  const [id, setId] = useState(1);
  const [elements, setElements] = useState<any[]>([winningNode]);
  const [attributeName, setAttributeName] = useState("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [itemAttributePairs, setItemAttributePairs] = useState<
    ItemAttributePair[]
  >([]);

  useEffect(() => {
    if (items.length >= 2) {
      let winningItem = findWinner(items);
      setWinner(winningItem);
    }
  }, [items, setWinner]);

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

  function handleGetWinner() {
    const newId = (id + 1).toString();
    setId(id + 1);

    const element = {
      id: newId,
      type: "output",
      data: { label: <WinningNode winner={winner} /> },
      position: { x: 400, y: 550 },
    };

    setElements([...elements, element]);
    // setElements([
    //   ...elements.filter((element) => element.type !== "output"),
    //   element,
    // ]);
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
    handleResetItem();
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
            onChange={handleItemInput}
            placeholder="E.g. Pizza"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCreateItemNode();
              }
            }}
          />
          <button onClick={() => handleCreateItemNode()}>Submit</button>
        </div>
      </div>
      <br />
      <button className="winning-button" onClick={handleGetWinner}>
        Reveal winner!
      </button>
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
