interface BlockProps {
  x: number;
  y: number;
  width: number;
  height: number;
  patternImage: string;
  //blockPattern: string;
}

export const Block = (blockProps: BlockProps) => {
  return (
    <>
      <rect
        key={`block-${blockProps.x}-${blockProps.y}`} // Unique key for React list rendering.
        x={blockProps.x} // X-coordinate of the block.
        y={blockProps.y} // Y-coordinate of the block.
        width={blockProps.width} // Width of the block.
        height={blockProps.height} // Height of the block.
        //fill={`url(#${blockProps.blockPattern})`} // Fill the block with the defined pattern.
        //stroke="#333" // Dark gray border for the blocks.
        //strokeWidth="0.5" // Border thickness.
        rx="0" // Horizontal radius for rounded corners.
        ry="0" // Vertical radius for rounded corners.
      />
    </>
  );
};
