import React, { useMemo } from "react";
import { Block } from "./Block";
import {
  FenceConfiguration,
  generatePathDFromElements,
  metersToUnits,
} from "@/app/configurator/page";

interface WallProps {
  fenceConfiguration: FenceConfiguration;
}

export const Wall = ({ fenceConfiguration }: WallProps) => {
  const { models, dimensions, fenceType } = fenceConfiguration;
  const { blockModel } = models;
  const { length: fenceLength, height: fenceHeight, baseHeight } = dimensions;
  const { width: blockWidth, height: blockHeight, modelImage } = blockModel;

  const rowCount =
    fenceType.key === "fullBlocks"
      ? metersToUnits(fenceHeight, blockHeight)
      : metersToUnits(baseHeight!, blockHeight);
  const columnCount = metersToUnits(fenceLength, blockWidth);

  const wallPathStyle = { stroke: "#333", strokeWidth: 0.5 };

  const { evenBlocksD, oddBlocksD } = useMemo(() => {
    const evenBlocks: React.JSX.Element[] = [];
    const oddBlocks: React.JSX.Element[] = [];

    for (let row = 0; row < rowCount; row++) {
      const isEven = row % 2 === 0;

      if (isEven) {
        // Full blocks all across
        for (let col = 0; col < columnCount; col++) {
          evenBlocks.push(
            <Block
              key={`even-${col}-${row}`}
              x={col * blockWidth}
              y={-row * blockHeight}
              width={blockWidth}
              height={blockHeight}
              patternImage={modelImage}
            />
          );
        }
      } else {
        // First half block
        oddBlocks.push(
          <Block
            key={`odd-half-start-${row}`}
            x={0}
            y={-row * blockHeight}
            width={blockWidth / 2}
            height={blockHeight}
            patternImage={modelImage}
          />
        );

        // Full blocks in between
        for (let col = 1; col < columnCount; col++) {
          oddBlocks.push(
            <Block
              key={`odd-${col}-${row}`}
              x={blockWidth / 2 + (col - 1) * blockWidth}
              y={-row * blockHeight}
              width={blockWidth}
              height={blockHeight}
              patternImage={modelImage}
            />
          );
        }

        // Last half block
        oddBlocks.push(
          <Block
            key={`odd-half-end-${row}`}
            x={blockWidth / 2 + (columnCount - 1) * blockWidth}
            y={-row * blockHeight}
            width={blockWidth / 2}
            height={blockHeight}
            patternImage={modelImage}
          />
        );
      }
    }

    return {
      evenBlocksD: generatePathDFromElements(evenBlocks),
      oddBlocksD: generatePathDFromElements(oddBlocks),
    };
  }, [rowCount, columnCount, blockWidth, blockHeight, modelImage]);

  return (
    <>
      <path
        d={evenBlocksD}
        fill="url(#block-pattern-even)"
        {...wallPathStyle}
      />
      <path d={oddBlocksD} fill="url(#block-pattern-odd)" {...wallPathStyle} />
    </>
  );
};
