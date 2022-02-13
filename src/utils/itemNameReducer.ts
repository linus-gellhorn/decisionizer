import { Action } from "../types";

export const initialItemName = "";
export const itemNameReducer = (attributeName: string, action: Action) => {
  switch (action.type) {
    case "update":
      return action.payload;
    case "resetItem":
      return initialItemName;
    default:
      throw new Error(`Unknown action type`);
  }
};
