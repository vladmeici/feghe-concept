"use client";
import { Pillar } from "@/components/fence/Pillar";
import { Wall } from "@/components/fence/Wall";

import { BlockModel, blocks } from "@/data/blocks";
import { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Block } from "@/components/fence/Block";
import FenceConfiguratorStepper from "@/components/common/FenceConfiguratorStepper";
import { Button, Divider } from "@mui/material";
import ModelStep from "./ModelStep";
import { FenceType, fenceTypes } from "@/data/fenceTypes";
import { Panel } from "@/components/fence/Panel";
import DimensionsStep from "./DimensionsStep";
import PanelsStep from "./PanelsStep";
import {
  PanelColor,
  PanelType,
  panelTypes,
  panelUnitHeights,
  PanelUnitSpace,
  panelUnitSpaceHeights,
  panelColors,
} from "@/data/panelTypes";
import { generatePathDFromElements, metersToUnits } from "../utils";

interface CapInfo {
  x: number;
  width: number;
}

export interface FenceModels {
  blockModel: BlockModel;
  capModel: BlockModel;
}

interface FenceDimensions {
  length: number;
  height: number;
  baseHeight: number;
}

interface PanelsConfiguration {
  orientation: PanelType;
  spaceDimension: PanelUnitSpace;
  panelUnitDimension: number;
  color: PanelColor;
}

export interface FenceConfiguration {
  fenceType: FenceType;
  models: FenceModels;
  dimensions: FenceDimensions;
  panels: PanelsConfiguration;
}

const defaultFenceConfiguration: FenceConfiguration = {
  fenceType: fenceTypes[0],
  models: { blockModel: blocks[0], capModel: blocks[0] },
  dimensions: { length: 8.4, height: 2, baseHeight: 0.8 },
  panels: {
    orientation: panelTypes[0],
    panelUnitDimension: panelUnitHeights[3],
    spaceDimension: panelUnitSpaceHeights[0],
    color: panelColors[0],
  },
};

export default function ConfiguratorGard() {
  const [fenceConfiguration, setFenceConfiguration] =
    useState<FenceConfiguration>(defaultFenceConfiguration);
  const [activeStep, setActiveStep] = useState(0);

  const centeredTransform = useRef<d3.ZoomTransform | null>(null);
  const [isCenterButtonDisabled, setCenterButtonDisabled] = useState(true);

  const { models, dimensions } = fenceConfiguration;
  const { blockModel } = models;
  const { height: fenceHeight, baseHeight } = dimensions;
  const { width: blockWidth, height: blockHeight } = blockModel;

  //const extentWidth = fenceLengthInMeters * 100 + 200;
  const [extentWidth, setExtentWidth] = useState(1000);
  const extentHeight = 400;

  const fenceViewBox = `0 0 ${extentWidth} ${400}`;

  const pillarsXPositions = [0];
  const capsInfo: CapInfo[] = [];

  let capsBlocks = [];
  let capsBlocksD;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const fenceGroupRef = useRef<SVGGElement | null>(null);

  const centerFence = useCallback(() => {
    // Ensure both SVG and the group element are available
    if (!svgRef.current || !fenceGroupRef.current || !extentWidth) {
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

      setCenterButtonDisabled(transform === centeredTransform.current);
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
    scale = scale * (fenceConfiguration.dimensions.length > 20 ? 0.95 : 0.9);

    // Calculate translate to center content
    const xTranslate = (extentWidth - fenceGroupWidth * scale) / 2;
    const yTranslate =
      extentHeight / 2 - (fenceGroupBBox.y + fenceGroupHeight / 2) * scale;

    const transform = d3.zoomIdentity
      .translate(xTranslate, yTranslate)
      .scale(scale);

    // Apply transform programmatically
    centeredTransform.current = transform;
    svg.transition().duration(500).call(zoom.transform, transform);
    setTimeout(() => {
      if (svgRef.current) {
        svgRef.current.style.visibility = "visible";
      }
    }, 500);
  }, [extentWidth, fenceConfiguration.dimensions.length]); // eslint-disable-line react-hooks/exhaustive-deps -- fenceLengthInMeters is an indirect dependency via getBBox()

  const generateCapsWhenFullBlock = () => {
    const fenceLengthInMeters = fenceConfiguration.dimensions.length;
    const fenceLength = Math.round(fenceLengthInMeters * 100);
    const fenceHeightInCentimeters = Math.round(fenceHeight * 100);
    const capLength = 23.5;
    const totalCaps = Math.floor(fenceLength / capLength);
    for (let i = 0; i <= totalCaps; i++) {
      capsInfo.push({
        x: -3.5 + i * capLength,
        width: capLength,
      });
    }

    capsBlocks = capsInfo.map((capInfo) => {
      return (
        <Block
          key={`cap-block-${capInfo.x}`}
          x={capInfo.x}
          y={-fenceHeightInCentimeters + blockHeight - 5}
          width={capInfo.width}
          height={5}
          patternImage={fenceConfiguration.models.blockModel.modelImage}
        ></Block>
      );
    });

    capsBlocksD = generatePathDFromElements(capsBlocks, 0, 0);
  };
  const computePillarsXPositions = () => {
    const fenceLengthInMeters = fenceConfiguration.dimensions.length;
    const fenceLength = Math.round(fenceLengthInMeters * 100);
    const intervals = Math.floor(fenceLengthInMeters / 2);
    const lastPillarX = fenceLength - blockWidth;
    const intervalLength = lastPillarX / intervals;

    for (
      let i = intervalLength;
      Math.floor(i) <= lastPillarX;
      i += intervalLength
    ) {
      pillarsXPositions.push(i);
    }

    const capLength = 23.5;
    pillarsXPositions.forEach((pillarXPosition, index) => {
      if (index === pillarsXPositions.length - 1) {
        return;
      }
      const capsPerInterval = Math.floor(
        (intervalLength - blockWidth) / capLength
      );
      const lastCapLength = Math.round(
        (intervalLength - blockWidth) % capLength
      );

      for (let i = 0; i <= capsPerInterval; i++) {
        capsInfo.push({
          x: pillarXPosition + blockWidth + i * capLength,
          width: i === capsPerInterval ? lastCapLength : capLength,
        });
      }
    });

    capsBlocks = capsInfo.map((capInfo) => {
      return (
        <Block
          key={`cap-block-${capInfo.x}`}
          x={capInfo.x}
          y={-20 * metersToUnits(baseHeight, blockHeight) + 15}
          width={capInfo.width}
          height={5}
          patternImage={fenceConfiguration.models.blockModel.modelImage}
        ></Block>
      );
    });

    capsBlocksD = generatePathDFromElements(capsBlocks, 0, 0);
    //pillarsXPositions.push(lastPillarX);
  };

  useEffect(() => {
    // This runs only on the client
    setExtentWidth(window.innerWidth);
    centerFence();
  }, [centerFence]);

  if (fenceConfiguration.fenceType.key === "fullBlocks") {
    generateCapsWhenFullBlock();
  } else {
    computePillarsXPositions();
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col ustify-around">
        <div className="flex justify-around items-center w-full p-2 h-16">
          <h2>FEGHE Concept - Configurator gard</h2>
        </div>
        <div className="flex justify-around items-center w-full p-2 h-16">
          <FenceConfiguratorStepper
            currentStep={activeStep}
            onStepChange={setActiveStep}
          ></FenceConfiguratorStepper>
        </div>
      </div>

      <Divider />
      <div className="flex flex-col justify-around">
        <div className="flex justify-around items-center w-full p-4">
          {activeStep === 0 && (
            <ModelStep
              fenceConfiguration={fenceConfiguration}
              setFenceConfiguration={setFenceConfiguration}
            ></ModelStep>
          )}
          {activeStep === 1 && (
            <DimensionsStep
              fenceConfiguration={fenceConfiguration}
              setFenceConfiguration={setFenceConfiguration}
            ></DimensionsStep>
          )}
          {activeStep === 2 && (
            <PanelsStep
              fenceConfiguration={fenceConfiguration}
              setFenceConfiguration={setFenceConfiguration}
            ></PanelsStep>
          )}
          {activeStep === 3 && (
            <ModelStep
              fenceConfiguration={fenceConfiguration}
              setFenceConfiguration={setFenceConfiguration}
            ></ModelStep>
          )}
          {activeStep === 4 && (
            <ModelStep
              fenceConfiguration={fenceConfiguration}
              setFenceConfiguration={setFenceConfiguration}
            ></ModelStep>
          )}
          {activeStep === 5 && (
            <ModelStep
              fenceConfiguration={fenceConfiguration}
              setFenceConfiguration={setFenceConfiguration}
            ></ModelStep>
          )}
        </div>
        <Divider />

        <div className="flex justify-around items-center w-full p-2">
          <Button
            variant="outlined"
            onClick={centerFence}
            disabled={isCenterButtonDisabled}
          >
            Centrare gard
          </Button>
        </div>
        <div className="w-full masked-div">
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
                  href={fenceConfiguration.models.blockModel.modelImage} // The URL of the image.
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
                  href={fenceConfiguration.models.blockModel.modelImage} // The URL of the image.
                  x={0}
                  y={0}
                  width={blockWidth} // Image width should match the pattern unit width.
                  height={blockHeight} // Image height should match the pattern unit height.
                  // Preserve aspect ratio and slice to fill the area, cropping if necessary.
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
              <pattern
                id={`block-pattern-cap`} // Unique ID to reference this pattern.
                x={0}
                y={0}
                width={23.5} // The width of a single pattern unit.
                height={5} // The height of a single pattern unit.
                patternUnits="userSpaceOnUse" // Pattern units are defined in the coordinate system of the element using the pattern.
              >
                <image
                  href={fenceConfiguration.models.capModel.modelImage} // The URL of the image.
                  x={0}
                  y={0}
                  width={23.5} // Image width should match the pattern unit width.
                  height={5} // Image height should match the pattern unit height.
                  // Preserve aspect ratio and slice to fill the area, cropping if necessary.
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>

            <g className="zoom-content" ref={fenceGroupRef}>
              <Wall fenceConfiguration={fenceConfiguration}></Wall>
              {fenceConfiguration.fenceType.key === "withPanels" &&
                pillarsXPositions.map((pillarX, index) => {
                  let pillarHeight = fenceHeight - baseHeight;
                  pillarHeight = Math.round(pillarHeight * 10) / 10;
                  return (
                    <Pillar
                      key={index}
                      rows={metersToUnits(pillarHeight, blockHeight)}
                      x={pillarX}
                      fenceConfiguration={fenceConfiguration}
                    ></Pillar>
                  );
                })}

              <path
                d={capsBlocksD}
                fill="url(#block-pattern-cap)"
                stroke="#333"
                strokeWidth="0.5"
              />
              {fenceConfiguration.fenceType.key === "withPanels" &&
                pillarsXPositions.map((pillarX, index) => {
                  if (index === pillarsXPositions.length - 1) {
                    return;
                  }
                  let pillarHeightInCentimeters =
                    100 * (fenceHeight - baseHeight);
                  pillarHeightInCentimeters =
                    Math.round(pillarHeightInCentimeters * 10) / 10;

                  const fenceLengthInMeters =
                    fenceConfiguration.dimensions.length;
                  const fenceLength = Math.round(fenceLengthInMeters * 100);
                  const intervals = Math.floor(fenceLengthInMeters / 2);
                  const lastPillarX = fenceLength - blockWidth;
                  const intervalLength = lastPillarX / intervals - blockWidth;
                  return (
                    <Panel
                      key={index}
                      x={blockWidth + pillarX}
                      y={
                        -metersToUnits(fenceHeight, blockHeight) * blockHeight +
                        blockHeight +
                        7.5
                      }
                      width={intervalLength}
                      height={pillarHeightInCentimeters - 20}
                      fenceConfiguration={fenceConfiguration}
                    ></Panel>
                  );
                })}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
