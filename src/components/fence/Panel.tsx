interface PanelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export const Panel = (panelProps: PanelProps) => {
  const x = panelProps.x;
  const y = panelProps.y;
  const width = panelProps.width;
  const height = panelProps.height;
  const color = panelProps.color;
  const pillarWidth = 3;
  const lamelHeight = 10;
  console.log(height % lamelHeight);
  const totalLamels =
    height % lamelHeight <= 2
      ? Math.floor(height / lamelHeight) - 1
      : Math.floor(height / lamelHeight);
  const spaceHeight = (height - totalLamels * lamelHeight) / (totalLamels - 1);
  console.log(spaceHeight);
  const lamelAndSpaceHeight = lamelHeight + spaceHeight;

  let lamelsD = "";

  for (let i = 0; i < totalLamels; i++) {
    lamelsD += `M${x + pillarWidth},${y + i * lamelAndSpaceHeight}
        h${width - 2 * pillarWidth}
        v${lamelHeight}
        h-${width - 2 * pillarWidth}
        v-${lamelHeight}
        Z`;
  }

  return (
    <>
      <path
        d={`M${x},${y}
        h${pillarWidth}
        v${height}
        h-${pillarWidth}
        v-${height}
        Z
        M${x + width - pillarWidth},${y}
        h${pillarWidth}
        v${height}
        h-${pillarWidth}
        v-${height}
        Z
        ${lamelsD}`
          .trim()
          .replace(/\s/g, "")}
        style={{ fill: color, stroke: "#333", strokeWidth: 0.5 }}
      />
    </>
  );
};
