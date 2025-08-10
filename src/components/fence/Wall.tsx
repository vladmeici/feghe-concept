import { Block } from "./Block";
import {
  FenceConfiguration,
  generatePathDFromElements,
  metersToColumns,
} from "@/app/configurator/page";
import React from "react";

interface WallProps {
  fenceConfiguration: FenceConfiguration;
}

export const Wall = (props: WallProps) => {
  const blockModel = props.fenceConfiguration.models.blockModel;
  const fenceLenght = props.fenceConfiguration.dimensions.length;

  const evenBlocks: React.JSX.Element[] = [];
  const oddBlocks: React.JSX.Element[] = [];

  const rows = props.fenceConfiguration.fenceType.key === "fullBlocks" ? 9 : 4;
  const columns = metersToColumns(fenceLenght, blockModel.width);
  const blockWidth = blockModel.width;
  const blockHeight = blockModel.height;
  const modelImage = blockModel.modelImage;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (i % 2 === 0) {
        evenBlocks.push(
          <Block
            key={`block-${j * blockWidth}-${-i * blockHeight}`}
            x={j * blockWidth}
            y={-i * blockHeight}
            width={blockWidth}
            height={blockHeight}
            patternImage={modelImage}
          ></Block>
        );
      } else {
        if (j === 0) {
          oddBlocks.push(
            <Block
              key={`block-0-${-i * blockHeight}`}
              x={0}
              y={-i * blockHeight}
              width={blockWidth / 2}
              height={blockHeight}
              patternImage={modelImage}
            ></Block>
          );
        } else {
          oddBlocks.push(
            <Block
              key={`block-${blockWidth / 2 + j * blockWidth}-${
                -i * blockHeight
              }`}
              x={blockWidth / 2 + (j - 1) * blockWidth}
              y={-i * blockHeight}
              width={blockWidth}
              height={blockHeight}
              patternImage={modelImage}
            ></Block>
          );
        }

        if (j === columns - 1) {
          oddBlocks.push(
            <Block
              key={`block-${j * (blockWidth + blockWidth / 2)}-${
                -i * blockHeight
              }`}
              x={blockWidth / 2 + j * blockWidth}
              y={-i * blockHeight}
              width={blockWidth / 2}
              height={blockHeight}
              patternImage={modelImage}
            ></Block>
          );
        }
      }
    }
  }

  const evenBlocksD = generatePathDFromElements(evenBlocks);
  const oddBlocksD = generatePathDFromElements(oddBlocks);

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
    </>
  );
};
