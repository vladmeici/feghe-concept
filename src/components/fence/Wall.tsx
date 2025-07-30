import { BlockModel } from "@/data/blocks";
import { Block } from "./Block";
import { getLastBlockWidth, metersToColumns } from "@/app/configurator/page";
import React from "react";

interface WallProps {
  blockModel: BlockModel;
  fenceLength: number;
}

export const Wall = (wallProps: WallProps) => {
  const blockModel = wallProps.blockModel;

  const evenBlocks: React.JSX.Element[] = [];
  const oddBlocks: React.JSX.Element[] = [];

  //const upperBlocks = [];

  const rows = 4;
  const columns = metersToColumns(wallProps.fenceLength, blockModel.width);
  const lastBlockWidth = getLastBlockWidth(
    wallProps.fenceLength,
    blockModel.width
  );
  const startingX = 0;
  const startingY = 0;
  const blockWidth = blockModel.width;
  const blockHeight = blockModel.height;
  const modelImage = blockModel.modelImage;

  // for (let i = 0; i < rows; i++) {
  //   upperBlocks.push(
  //     <Block
  //       key={`upper-block-${startingX + i * blockWidth}-${
  //         startingY - i * blockHeight
  //       }`}
  //       x={startingX - 4 + i * (blockWidth + 8)}
  //       y={startingY - 80}
  //       width={blockWidth + 8}
  //       height={5}
  //       patternImage={modelImage}
  //     ></Block>
  //   );
  // }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++)
      if (i % 2 === 0) {
        evenBlocks.push(
          <Block
            key={`block-${startingX + j * blockWidth}-${
              startingY - i * blockHeight
            }`}
            x={startingX + j * blockWidth}
            y={startingY - i * blockHeight}
            width={blockWidth}
            height={blockHeight}
            patternImage={modelImage}
          ></Block>
        );
        if (j === columns - 1 && lastBlockWidth > 0) {
          evenBlocks.push(
            <Block
              key={`block-${startingX + (j + 1) * blockWidth}-${
                startingY - i * blockHeight
              }`}
              x={startingX + (j + 1) * blockWidth}
              y={startingY - i * blockHeight}
              width={lastBlockWidth}
              height={blockHeight}
              patternImage={modelImage}
            ></Block>
          );
        }
      } else {
        if (j === 0) {
          oddBlocks.push(
            <Block
              key={`block-${startingX + j * (blockWidth + blockWidth / 2)}-${
                startingY - i * blockHeight
              }`}
              x={startingX + j * (blockWidth + blockWidth / 2)}
              y={startingY - i * blockHeight}
              width={blockWidth / 2}
              height={blockHeight}
              patternImage={modelImage}
            ></Block>
          );
        } else {
          oddBlocks.push(
            <Block
              key={`block-${startingX + blockWidth / 2 + j * blockWidth}-${
                startingY - i * blockHeight
              }`}
              x={startingX + blockWidth / 2 + (j - 1) * blockWidth}
              y={startingY - i * blockHeight}
              width={blockWidth}
              height={blockHeight}
              patternImage={modelImage}
            ></Block>
          );
        }
        if (j === columns - 1) {
          if (blockWidth / 2 + lastBlockWidth <= blockWidth) {
            oddBlocks.push(
              <Block
                key={`block-${startingX + j * (blockWidth + blockWidth / 2)}-${
                  startingY - i * blockHeight
                }`}
                x={startingX + blockWidth / 2 + j * blockWidth}
                y={startingY - i * blockHeight}
                width={blockWidth / 2 + lastBlockWidth}
                height={blockHeight}
                patternImage={modelImage}
              ></Block>
            );
          } else {
            oddBlocks.push(
              <Block
                key={`block-${startingX + j * (blockWidth + blockWidth / 2)}-${
                  startingY - i * blockHeight
                }`}
                x={startingX + blockWidth / 2 + j * blockWidth}
                y={startingY - i * blockHeight}
                width={blockWidth}
                height={blockHeight}
                patternImage={modelImage}
              ></Block>
            );
            oddBlocks.push(
              <Block
                key={`block-${
                  startingX + (j + 1) * (blockWidth + blockWidth / 2)
                }-${startingY - i * blockHeight}`}
                x={startingX + blockWidth / 2 + (j + 1) * blockWidth}
                y={startingY - i * blockHeight}
                width={blockWidth - lastBlockWidth}
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
      {/* {blocks} */}
      {/* {upperBlocks} */}
    </>
  );
};

function generatePathDFromElements(blockElements: React.JSX.Element[]): string {
  return blockElements
    .map((el) => {
      const { x, y, width, height } = el.props;
      const r = 2;
      //return `M${x} ${y}h${width}v${height}h-${width}Z`;
      return `
        M${x + r},${y}
        h${width - 2 * r}
        a${r},${r} 0 0 1 ${r},${r}
        v${height - 2 * r}
        a${r},${r} 0 0 1 -${r},${r}
        h-${width - 2 * r}
        a${r},${r} 0 0 1 -${r},-${r}
        v-${height - 2 * r}
        a${r},${r} 0 0 1 ${r},-${r}
        Z
      `.trim();
    })
    .join(" ");
}
