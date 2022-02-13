export default function createEdge(
  source: string,
  target: string,
  style: { stroke: string },
  isAnimated: boolean
) {
  const edge = {
    id: `e${source}-${target}`,
    source: source,
    target: target,
    animated: isAnimated,
    style: style,
  };
  return edge;
}
