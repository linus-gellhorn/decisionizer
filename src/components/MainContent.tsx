import ReactFlow, { Background, Controls, MiniMap } from "react-flow-renderer";
import AttributeNode from "./AttributeNode";
import ItemNode from "./ItemNode";
import WinningNode from "./WinningNode";
import React, { useState, useEffect, useReducer, ChangeEvent } from "react";
import { Attribute, Item, ItemAttributePair, Edge } from "../types";
import findWinner from "../utils/findWinner";
import createEdge from "../utils/createEdge";
import { initialItemName, itemNameReducer } from "../utils/itemNameReducer";
import { Button, TextField } from "@mui/material";

export const AttributesContext = React.createContext<Attribute[]>([]);
export const ItemAttributePairsContext = React.createContext<
  ItemAttributePair[]
>([]);
export const WinnerContext = React.createContext("");

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

  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [winner, setWinner] = useState("");
  const winningNode = {
    id: "0",
    type: "output",
    data: { label: <WinningNode /> },
    position: { x: 400, y: 400 },
    draggable: true,
    isHidden: true,
  };

  const [id, setId] = useState(1);
  const [elements, setElements] = useState<any[]>([winningNode]);
  const [attributeName, setAttributeName] = useState("");
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

  useEffect(() => {
    elements.shift();
    const updatedWinningNode = {
      id: "0",
      type: "output",
      data: { label: <WinningNode /> },
      position: { x: 400, y: 400 + 65 * attributes.length },
      draggable: true,
      isHidden: false,
    };
    elements.unshift(updatedWinningNode);
    setElements(elements);
  }, [elements, attributes.length]);

  function addAttributeEdgesLater(currentId: string) {
    let newEdges: Edge[] = [];
    for (let item of elements) {
      if (item.type === "default") {
        newEdges.push(
          createEdge(currentId, item.id, { stroke: "blue" }, false)
        );
      }
    }
    setElements((arr) => arr.concat(newEdges));
  }

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
    if (attributeName === "") {
      alert("Please input an attribute name");
      return;
    }
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
        y: 30,
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
    addAttributeEdgesLater(newId);
  }

  function handleCreateItemNode() {
    if (itemName === "") {
      alert("Please input an item name");
      return;
    }
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
        y: 220,
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
  const nodeStrokeColor = (node: any) => {
    if (node.type === "input") return "blue";
    if (node.type === "default") return "black";
    if (node.type === "output") return "red";
    return "gray";
  };

  return (
    <>
      <div className="options">
        <div className="attributes">
          <h2>What attributes do you value?</h2>
          <TextField
            size="small"
            id="outlined-basic"
            label="Add attribute"
            variant="outlined"
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
          <Button
            sx={{ mx: 1 }}
            color="primary"
            variant="contained"
            onClick={() => handleCreateAttributeNode()}
          >
            Submit
          </Button>
        </div>
        <div className="items">
          <h2>What items do you want to compare?</h2>
          <TextField
            size="small"
            id="outlined-basic"
            label="Add item"
            variant="outlined"
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
          <Button
            sx={{ mx: 1 }}
            color="primary"
            variant="contained"
            onClick={() => handleCreateItemNode()}
          >
            Submit
          </Button>
        </div>
      </div>
      <br />
      <div className="flowchart">
        <AttributesContext.Provider value={attributes}>
          <ItemAttributePairsContext.Provider value={itemAttributePairs}>
            <WinnerContext.Provider value={winner}>
              <ReactFlow
                elements={elements}
                style={flowStyles}
                nodesDraggable={false}
                snapToGrid={true}
              >
                <MiniMap
                  nodeStrokeColor={nodeStrokeColor}
                  nodeBorderRadius={5}
                />
                <Background />
                <Controls />
              </ReactFlow>
            </WinnerContext.Provider>
          </ItemAttributePairsContext.Provider>
        </AttributesContext.Provider>
      </div>
    </>
  );
}

export default MainContent;
