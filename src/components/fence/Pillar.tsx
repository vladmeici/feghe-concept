import { FenceConfiguration } from "@/app/configurator/page";
import { Block } from "./Block";
import { generatePathDFromElements, metersToUnits } from "@/app/utils";

interface PillarProps {
  rows: number;
  x: number;
  fenceConfiguration: FenceConfiguration;
}

export const Pillar = ({ rows, x, fenceConfiguration }: PillarProps) => {
  const evenBlocks: React.JSX.Element[] = [];
  const oddBlocks: React.JSX.Element[] = [];

  const { models, dimensions } = fenceConfiguration;
  const { blockModel, capModel } = models;
  const { baseHeight } = dimensions;
  const { width: blockWidth, height: blockHeight } = blockModel;

  const startingX = x;
  const startingY = -blockHeight * metersToUnits(baseHeight, blockHeight);

  const capsPillarBlocks = [
    <Block
      key={`upper-block-${startingX}-${startingY}`}
      x={startingX - 3.5}
      y={startingY - blockHeight * rows + blockHeight - 5}
      width={23.5}
      height={5}
      patternImage={capModel.modelImage}
    ></Block>,
    <Block
      key={`upper-block-${startingX - 3.5 + 23.5}-${startingY}`}
      x={startingX - 3.5 + 23.5}
      y={startingY - blockHeight * rows + blockHeight - 5}
      width={23.5}
      height={5}
      patternImage={capModel.modelImage}
    ></Block>,
  ];

  for (let i = 0; i < rows; i++) {
    if (i % 2 === 0) {
      evenBlocks.push(
        <Block
          key={`block-${startingX}-${startingY - i * blockHeight}`}
          x={startingX}
          y={startingY - i * blockHeight}
          width={blockWidth}
          height={blockHeight}
          patternImage={blockModel.modelImage}
        ></Block>
      );
    } else {
      oddBlocks.push(
        <Block
          key={`block-${startingX}-${startingY - i * blockHeight}`}
          x={startingX}
          y={startingY - i * blockHeight}
          width={blockWidth / 2}
          height={blockHeight}
          patternImage={blockModel.modelImage}
        ></Block>
      );
      oddBlocks.push(
        <Block
          key={`block-${startingX + blockWidth / 2}-${
            startingY - i * blockHeight
          }`}
          x={startingX + blockWidth / 2}
          y={startingY - i * blockHeight}
          width={blockWidth / 2}
          height={blockHeight}
          patternImage={blockModel.modelImage}
        ></Block>
      );
    }
  }

  const evenBlocksD = generatePathDFromElements(evenBlocks);
  const oddBlocksD = generatePathDFromElements(oddBlocks);
  const upperBlockD = generatePathDFromElements(capsPillarBlocks, 1, 1);

  return (
    <>
      <path
        d={evenBlocksD}
        fill="url(#block-pattern-even)"
        stroke="#333"
        strokeWidth="0.5"
      />
      <path
        d={oddBlocksD}
        fill="url(#block-pattern-odd)"
        stroke="#333"
        strokeWidth="0.5"
      />
      <path
        d={upperBlockD}
        fill="url(#block-pattern-cap)"
        stroke="#333"
        strokeWidth="0.5"
      />
    </>
  );
};
