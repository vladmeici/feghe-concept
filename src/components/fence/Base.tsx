export const Base = () => {
  const startingX = 80;
  const startingY = 340;
  const baseWidth = 840;
  const BaseHeight = 40;

  return (
    <>
      <defs>
        {/* Define the pattern to be used for filling the blocks. */}
        <pattern
          id={"fence-base-pattern"} // Unique ID to reference this pattern.
          x="0"
          y="0"
          width={200}
          height={50}
          patternUnits="userSpaceOnUse"
        >
          {" "}
          <image
            href={"/assets/gard/fence_base.avif"} // The URL of the image.
            x="0"
            y="0"
            width={200} // Image width should match the pattern unit width.
            height={50} // Image height should match the pattern unit height.
            // Preserve aspect ratio and slice to fill the area, cropping if necessary.
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>
      <rect
        key={`fence-base`} // Unique key for React list rendering.
        x={startingX} // X-coordinate of the block.
        y={startingY} // Y-coordinate of the block.
        width={baseWidth} // Width of the block.
        height={BaseHeight} // Height of the block.
        fill={`url(#fence-base-pattern)`}
        stroke="#333" // Dark gray border for the blocks.
        strokeWidth="1" // Border thickness.
      />

      <defs>
        <pattern
          id="diagonalHatch"
          patternUnits="userSpaceOnUse"
          width="10"
          height="10"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            stroke="black"
            strokeWidth="1"
          ></line>
        </pattern>

        <pattern
          id="diagonalHatch2"
          patternUnits="userSpaceOnUse"
          width="10"
          height="10"
        >
          <line
            x1="0"
            y1="10"
            x2="10"
            y2="0"
            stroke="blue"
            strokeWidth="1"
          ></line>
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            stroke="blue"
            strokeWidth="1"
          ></line>
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="10"
            stroke="blue"
            strokeWidth="1"
          ></line>
        </pattern>

        <pattern
          id="diagonalHatch3"
          patternUnits="userSpaceOnUse"
          width="10"
          height="10"
        >
          <path
            d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2"
            stroke="green"
            strokeWidth="1"
          ></path>
        </pattern>
      </defs>

      <rect
        key={`fence-base-undergorund`} // Unique key for React list rendering.
        x={startingX} // X-coordinate of the block.
        y={startingY + 10} // Y-coordinate of the block.
        width={baseWidth} // Width of the block.
        height={BaseHeight - 10} // Height of the block.
        fill="green"
        opacity={0.5}
        stroke="#333" // Dark gray border for the blocks.
        strokeWidth="1" // Border thickness.
      />
      <rect
        key={`fence-base-undergorund-strips`} // Unique key for React list rendering.
        x={startingX} // X-coordinate of the block.
        y={startingY + 10} // Y-coordinate of the block.
        width={baseWidth} // Width of the block.
        height={BaseHeight - 10} // Height of the block.
        fill="url(#diagonalHatch)"
        stroke="#333" // Dark gray border for the blocks.
        strokeWidth="1" // Border thickness.
      />
    </>
  );
};
