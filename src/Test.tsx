import { useReducer, ChangeEvent, useState } from "react";

function Test() {
  const [attribute, dispatch] = useReducer(reducer, initialValue);
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  const handleReset = () => {
    dispatch({
      type: "reset",
    });
  };

  const handleSave = () => {
    setAttributes([...attributes, attribute]);
    handleReset();
  };

  return (
    <div>
      <h2>What attributes do you value?</h2>
      <input
        value={attribute.name}
        type="text"
        name="name"
        onChange={handleInput}
      />
      <input
        value={attribute.weighting}
        type="range"
        name="weighting"
        onChange={handleInput}
      />

      <p>Attribute name: {attribute.name}</p>
      <p>Weighting: {parseInt(attribute.weighting) / 100}</p>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSave}>Save to attributes</button>
      <h4>
        {attributes.map((attribute) => (
          <p key={attribute.name}>{attribute.name}</p>
        ))}
      </h4>
      <hr />
    </div>
  );
}

export default Test;

type Attribute = {
  name: string;
  weighting: string;
};

type Action =
  | {
      type: "update";
      payload: {
        key: string;
        value: string;
      };
    }
  | { type: "reset" }
  | {
      type: "slider";
      payload: {
        key: string;
        value: string;
      };
    };

const initialValue = {
  name: "",
  weighting: "50",
};

const reducer = (attribute: Attribute, action: Action) => {
  switch (action.type) {
    case "update":
      return { ...attribute, [action.payload.key]: action.payload.value };
    case "reset":
      return initialValue;
    default:
      throw new Error(`Unknown action type`);
  }
};
