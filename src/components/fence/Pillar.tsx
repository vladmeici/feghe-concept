import { Block } from "./Block";

interface PillarProps {
  rows: number;
  x: number;
  y: number;
  blockWidth: number;
  blockHeight: number;
}

export const Pillar = (pillarProps: PillarProps) => {
  const blockModel = "/assets/gard/rivago/rivago-crem.jpg";

  const blocks = [];

  const rows = pillarProps.rows;
  const startingX = pillarProps.x;
  const startingY = pillarProps.y;
  const blockWidth = pillarProps.blockWidth;
  const blockHeight = pillarProps.blockHeight;

  const upperBlock = (
    <Block
      key={`upper-block-${startingX}-${startingY}`}
      x={startingX - 4}
      y={startingY - 80}
      width={blockWidth + 8}
      height={5}
      patternImage={blockModel}
    ></Block>
  );

  for (let i = 0; i < rows; i++) {
    if (i % 2 === 0) {
      blocks.push(
        <Block
          key={`block-${startingX}-${startingY - i * blockHeight}`}
          x={startingX}
          y={startingY - i * blockHeight}
          width={blockWidth}
          height={blockHeight}
          patternImage={blockModel}
        ></Block>
      );
    } else {
      blocks.push(
        <Block
          key={`block-${startingX}-${startingY - i * blockHeight}`}
          x={startingX}
          y={startingY - i * blockHeight}
          width={blockWidth / 2}
          height={blockHeight}
          patternImage={blockModel}
        ></Block>
      );
      blocks.push(
        <Block
          key={`block-${startingX + blockWidth / 2}-${
            startingY - i * blockHeight
          }`}
          x={startingX + blockWidth / 2}
          y={startingY - i * blockHeight}
          width={blockWidth / 2}
          height={blockHeight}
          patternImage={blockModel}
        ></Block>
      );
    }
  }

  return (
    <>
      {blocks}
      {upperBlock}
    </>
  );
};
