import { useContext } from "react";
import { WinnerContext } from "./MainContent";

export default function WinningNode() {
  const winner = useContext(WinnerContext);
  return <>{winner ? <h3>{winner.toUpperCase()}</h3> : <h3>Winner: ???</h3>}</>;
}
