import { FenceConfiguration } from "@/app/configurator/page";
import { floorToOneDecimal } from "@/app/utils";

interface PanelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fenceConfiguration: FenceConfiguration;
}

export const Panel = ({
  x,
  y,
  width,
  height,
  fenceConfiguration,
}: PanelProps) => {
  const pillarDimension = 3;

  const { panels } = fenceConfiguration;
  const {
    orientation,
    spaceDimension,
    panelUnitDimension,
    color: colorConfig,
  } = panels;
  const color = colorConfig.color;
  const spaceHeightRange = spaceDimension.range;

  const panelUnitDimensionInCm = floorToOneDecimal(panelUnitDimension / 10);

  function getTotalLamels(
    dimensionToFill: number,
    gapMin: number,
    lamelDimension = 10
  ): number {
    const EPS = 1e-9;

    const minDimension = (n: number) => {
      if (orientation.key === "horizontal") {
        return lamelDimension * n + gapMin * (n - 1);
      }
      return gapMin + lamelDimension * n + gapMin * n;
    };

    let bestN: number | null = null;

    // Find the largest n such that min possible height <= X
    for (let n = 1; ; n++) {
      if (minDimension(n) - EPS > dimensionToFill) break;
      bestN = n;
    }

    if (bestN === null) return 1;
    if (bestN === 1) return 1;

    return bestN;
  }

  const dimensionToFill = orientation.key === "horizontal" ? height : width;

  const totalLamels = getTotalLamels(
    dimensionToFill,
    spaceHeightRange[0],
    panelUnitDimensionInCm
  );

  const totalSpaces =
    orientation.key === "horizontal" ? totalLamels - 1 : totalLamels + 1;

  const calculatedSpaceDimension =
    totalLamels === 1
      ? 0
      : (dimensionToFill - totalLamels * panelUnitDimensionInCm) / totalSpaces;

  const lamelAndSpaceDimension =
    panelUnitDimensionInCm + calculatedSpaceDimension;

  height = totalLamels === 1 ? panelUnitDimensionInCm : height;

  let lamelsD = "";

  if (orientation.key === "horizontal") {
    for (let i = 0; i < totalLamels; i++) {
      lamelsD += `M${x + pillarDimension},${y + i * lamelAndSpaceDimension}
        h${width - 2 * pillarDimension}
        v${panelUnitDimensionInCm}
        h-${width - 2 * pillarDimension}
        v-${panelUnitDimensionInCm}
        Z`;
    }
  } else if (orientation.key === "vertical") {
    for (let i = 0; i < totalLamels; i++) {
      lamelsD += `M${
        calculatedSpaceDimension + x + i * lamelAndSpaceDimension
      },${y}
        h${panelUnitDimensionInCm}
        v${height}
        h-${panelUnitDimensionInCm}
        v-${height}
        Z`;
    }
  }

  let pillarsD = "";
  if (orientation.key === "horizontal") {
    {
      pillarsD = `M${x},${y}
        h${pillarDimension}
        v${height}
        h-${pillarDimension}
        v-${height}
        Z
        M${x + width - pillarDimension},${y}
        h${pillarDimension}
        v${height}
        h-${pillarDimension}
        v-${height}
        Z`;
    }
  } else if (orientation.key === "vertical") {
    pillarsD = `M${x},${y + height / 3}
        h${width}
        v${pillarDimension}
        h-${width}
        v-${pillarDimension}
        Z
        M${x},${y + (height * 2) / 3}
        h${width}
        v${pillarDimension}
        h-${width}
        v-${pillarDimension}
        Z`;
  }

  return (
    <>
      <path
        d={`
          ${pillarsD}`
          .trim()
          .replace(/\s/g, "")}
        style={{ fill: color, stroke: "#333", strokeWidth: 0.5 }}
      />
      <path
        d={`
        ${lamelsD}`
          .trim()
          .replace(/\s/g, "")}
        style={{ fill: color, stroke: "#333", strokeWidth: 0.5 }}
      />
    </>
  );
};
