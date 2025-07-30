"use client";
import { Pillar } from "@/components/fence/Pillar";
import { Wall } from "@/components/fence/Wall";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { BlockModel, blocks } from "@/data/blocks";
import { Key, useCallback, useEffect, useRef, useState } from "react";
import { Button, Slider, Tooltip } from "@heroui/react";
import * as d3 from "d3";

export default function ConfiguratorGard() {
  const [selectedBlockModel, setSelectedBlockModel] = useState<BlockModel>(
    blocks[0]
  );
  const [fenceLengthInMeters, setFenceLength] = useState<number>(10);
  const [fenceLengthInputValue, setFenceLengthInputValue] =
    useState<string>("10");

  const onBlockModelSelectionChange = (key: Key | null) => {
    const selectedBlock = blocks.find((block) => block.key === key);
    if (selectedBlock) {
      setSelectedBlockModel(selectedBlock);
    }
  };

  const blockWidth = selectedBlockModel.width;
  const blockHeight = selectedBlockModel.height;

  //const extentWidth = fenceLengthInMeters * 100 + 200;
  const extentWidth = 1200;
  const extentHeight = 400;

  const fenceViewBox = `0 0 ${extentWidth} ${400}`;
  //const fenceViewBox = `0 0 1200 400`;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const fenceGroupRef = useRef<SVGGElement | null>(null);

  const centerFence = useCallback(() => {
    // Ensure both SVG and the group element are available
    if (!svgRef.current || !fenceGroupRef.current) {
      return;
    }

    const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
    const g = svg.select<SVGGElement>(".zoom-content");

    // Define the zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 8]) // Set zoom limits
      .translateExtent([
        [-Infinity, -Infinity],
        [Infinity, Infinity],
      ])
      .on("zoom", zoomed); // Attach the zoom event handler

    // Apply the zoom behavior to the SVG
    svg.call(zoom); // Function to handle zoom events

    function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
      // Get the current transform state from the event

      const transform = event.transform; // Apply the transformation to the 'g' element // Now using both transform.x and transform.y for panning

      g.attr(
        "transform",
        `translate(${transform.x}, ${transform.y}) scale(${transform.k})`
      );
    }

    // ---- Centering and scaling logic ----
    const fenceGroupNode = fenceGroupRef.current;

    const fenceGroupBBox = fenceGroupNode.getBBox();
    const fenceGroupWidth = fenceGroupBBox.width;
    const fenceGroupHeight = fenceGroupBBox.height;

    // Calculate scale to fit content inside SVG
    let scale = Math.min(
      extentWidth / fenceGroupWidth,
      extentHeight / fenceGroupHeight
    );
    //let scale = extentWidth / fenceGroupWidth;
    scale = scale * 0.95;

    // Calculate translate to center content
    const xTranslate = (extentWidth - fenceGroupWidth * scale) / 2;
    const yTranslate =
      extentHeight / 2 - (fenceGroupBBox.y + fenceGroupHeight / 2) * scale;

    const transform = d3.zoomIdentity
      .translate(xTranslate, yTranslate)
      .scale(scale);

    // Apply transform programmatically
    svg.transition().duration(500).call(zoom.transform, transform);
    setTimeout(() => {
      if (svgRef.current) {
        svgRef.current.style.visibility = "visible";
      }
    }, 500);
  }, [fenceLengthInMeters]); // eslint-disable-line react-hooks/exhaustive-deps -- fenceLengthInMeters is an indirect dependency via getBBox()

  useEffect(() => {
    centerFence();
  }, [centerFence]); // Dependency on the memoized centerFence

  const handleFenceLengthChange = (value: number | number[]) => {
    if (isNaN(Number(value)) || Array.isArray(value)) return;

    setFenceLength(value);
    setFenceLengthInputValue(String(value));
  };

  return (
    <div className="flex-col">
      <div className="flex w-full p-2 flex-1/4">
        <Autocomplete
          className="max-w-xs flex-1/2 m-5"
          defaultItems={blocks}
          label="Alege modelul de boltar"
          variant={"bordered"}
          onSelectionChange={onBlockModelSelectionChange}
        >
          {(item) => (
            <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
        <Slider
          className="max-w-md flex-1/2 m-5"
          maxValue={100}
          minValue={1}
          label="Lungime gard (m)"
          marks={[
            {
              value: 1,
              label: "1",
            },
            {
              value: 10,
              label: "10",
            },
            {
              value: 25,
              label: "25",
            },
            {
              value: 50,
              label: "50",
            },
            {
              value: 75,
              label: "75",
            },
            {
              value: 100,
              label: "100",
            },
          ]}
          step={0.1}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          renderValue={({ children, ...props }) => (
            <output {...props}>
              <Tooltip
                className="text-tiny text-default-500 rounded-md"
                content="Apase Enter pentru confirmare"
                placement="left"
              >
                <input
                  aria-label="Temperature value"
                  className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-hidden transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                  type="text"
                  value={fenceLengthInputValue}
                  onChange={(e) => {
                    const v = e.target.value;
                    setFenceLengthInputValue(v);
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !isNaN(Number(fenceLengthInputValue))
                    ) {
                      let newFenceLength = Number(fenceLengthInputValue);
                      newFenceLength =
                        newFenceLength < 2
                          ? 2
                          : newFenceLength > 100
                          ? 100
                          : newFenceLength;
                      setFenceLength(newFenceLength);
                    }
                  }}
                />
              </Tooltip>
            </output>
          )}
          size="lg"
          onChange={handleFenceLengthChange}
          value={fenceLengthInMeters}
        />
        <Button color="primary" onPress={centerFence}>
          Centrare gard
        </Button>
      </div>
      <div className="w-full">
        <svg ref={svgRef} viewBox={fenceViewBox} className="invisible">
          <defs>
            {/* Define the pattern to be used for filling the blocks. */}
            <pattern
              id={`block-pattern-odd`} // Unique ID to reference this pattern.
              x={20}
              y={0}
              width={blockWidth} // The width of a single pattern unit.
              height={blockHeight} // The height of a single pattern unit.
              patternUnits="userSpaceOnUse" // Pattern units are defined in the coordinate system of the element using the pattern.
            >
              <image
                href={selectedBlockModel.modelImage} // The URL of the image.
                x={0}
                y={0}
                width={blockWidth} // Image width should match the pattern unit width.
                height={blockHeight} // Image height should match the pattern unit height.
                // Preserve aspect ratio and slice to fill the area, cropping if necessary.
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
            <pattern
              id={`block-pattern-even`} // Unique ID to reference this pattern.
              x={0}
              y={0}
              width={blockWidth} // The width of a single pattern unit.
              height={blockHeight} // The height of a single pattern unit.
              patternUnits="userSpaceOnUse" // Pattern units are defined in the coordinate system of the element using the pattern.
            >
              <image
                href={selectedBlockModel.modelImage} // The URL of the image.
                x={0}
                y={0}
                width={blockWidth} // Image width should match the pattern unit width.
                height={blockHeight} // Image height should match the pattern unit height.
                // Preserve aspect ratio and slice to fill the area, cropping if necessary.
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
          <g className="zoom-content" ref={fenceGroupRef}>
            <Wall
              blockModel={selectedBlockModel}
              fenceLength={fenceLengthInMeters}
            ></Wall>
            {/* <Pillar
              rows={5}
              blockWidth={blockWidth}
              blockHeight={blockHeight}
              x={80}
              y={240}
            ></Pillar>
            <Pillar
              rows={5}
              blockWidth={blockWidth}
              blockHeight={blockHeight}
              x={280}
              y={240}
            ></Pillar>
            <Pillar
              rows={5}
              blockWidth={blockWidth}
              blockHeight={blockHeight}
              x={480}
              y={240}
            ></Pillar>
            <Pillar
              rows={5}
              blockWidth={blockWidth}
              blockHeight={blockHeight}
              x={680}
              y={240}
            ></Pillar>
            <Pillar
              rows={5}
              blockWidth={blockWidth}
              blockHeight={blockHeight}
              x={880}
              y={240}
            ></Pillar> */}
          </g>
        </svg>
      </div>
    </div>
  );
}

export function metersToColumns(
  meters: number,
  oneColumnLenghtInCentimeters: number
): number {
  return Math.floor((meters * 100) / oneColumnLenghtInCentimeters);
}

export function getLastBlockWidth(
  meters: number,
  oneColumnLenghtInCentimeters: number
) {
  return Math.round((meters * 100) % oneColumnLenghtInCentimeters);
}
