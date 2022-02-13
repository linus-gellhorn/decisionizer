export default function WinningNode(props: { winner: string }) {
  return <>{props.winner ? <h3>{props.winner}</h3> : <h3>???</h3>}</>;
}
