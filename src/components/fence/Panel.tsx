interface PanelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const lowSpaceRange = [0.8, 1.5];
const mediumSpaceRange = [1.5, 2.5];
const highSpaceRange = [2.5, 5];

export const Panel = (panelProps: PanelProps) => {
  const x = panelProps.x;
  const y = panelProps.y;
  const width = panelProps.width;
  let height = panelProps.height;
  const color = panelProps.color;
  const pillarWidth = 3;
  let lamelHeight = 10;

  function getTotalLamels(
    totalHeight: number,
    gapMin: number,
    lamelHeight = 10
  ): number {
    const EPS = 1e-9;

    const minHeight = (n: number) => lamelHeight * n + gapMin * (n - 1);

    let bestN: number | null = null;

    // Find the largest n such that min possible height <= X
    for (let n = 1; ; n++) {
      if (minHeight(n) - EPS > totalHeight) break;
      bestN = n;
    }

    if (bestN === null) return 1;
    if (bestN === 1) return 1;

    return bestN;
  }

  const totalLamels = getTotalLamels(height, mediumSpaceRange[0], lamelHeight);

  const spaceHeight =
    totalLamels === 1
      ? 0
      : (height - totalLamels * lamelHeight) / (totalLamels - 1);

  const lamelAndSpaceHeight = lamelHeight + spaceHeight;

  height = totalLamels === 1 ? lamelHeight : height;

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
