import { Autocomplete, Box, InputAdornment, TextField } from "@mui/material";
import { FenceConfiguration } from "./page";
import { SyntheticEvent } from "react";
import {
  PanelColor,
  panelColors,
  PanelType,
  panelTypes,
  panelUnitHeights,
  PanelUnitSpace,
  panelUnitSpaceHeights,
} from "@/data/panelTypes";

interface PanelsStepProps {
  fenceConfiguration: FenceConfiguration;
  setFenceConfiguration: React.Dispatch<
    React.SetStateAction<FenceConfiguration>
  >;
}

export default function PanelsStep({
  fenceConfiguration,
  setFenceConfiguration,
}: PanelsStepProps) {
  const { panels } = fenceConfiguration;
  const {
    orientation,
    spaceDimension: spaceHeight,
    panelUnitDimension: panelUnitHeight,
    color: colorConfig,
  } = panels;

  const handlePanelsOrientationChange = (
    _: SyntheticEvent,
    value: PanelType | null
  ) => {
    if (!value) return;
    setFenceConfiguration((prev) => ({
      ...prev,
      panels: {
        ...prev.panels,
        orientation: value,
      },
    }));
  };
  const handlePanelUnitHeightChange = (
    _: SyntheticEvent,
    value: number | null
  ) => {
    if (!value) return;
    setFenceConfiguration((prev) => ({
      ...prev,
      panels: {
        ...prev.panels,
        panelUnitDimension: value,
      },
    }));
  };
  const handlePanelUnitSpaceHeightChange = (
    _: SyntheticEvent,
    value: PanelUnitSpace | null
  ) => {
    if (!value) return;
    setFenceConfiguration((prev) => ({
      ...prev,
      panels: {
        ...prev.panels,
        spaceDimension: value,
      },
    }));
  };
  const handlePanelColorChange = (
    _: SyntheticEvent,
    value: PanelColor | null
  ) => {
    if (!value) return;
    setFenceConfiguration((prev) => ({
      ...prev,
      panels: {
        ...prev.panels,
        color: value,
      },
    }));
  };

  return (
    <Box className="flex w-full gap-2 justify-around">
      <Autocomplete
        disablePortal
        options={panelTypes}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Alege tipul de panou" />
        )}
        value={orientation}
        onChange={handlePanelsOrientationChange}
      />
      <Autocomplete
        disablePortal
        options={panelUnitHeights}
        sx={{ width: 300 }}
        getOptionLabel={(option) => option.toString()}
        renderInput={(params) => (
          <TextField {...params} label="Alege latimea lamelei" />
        )}
        value={panelUnitHeight}
        onChange={handlePanelUnitHeightChange}
      />
      <Autocomplete
        disablePortal
        options={
          panelUnitHeight <= 60
            ? panelUnitSpaceHeights
            : [panelUnitSpaceHeights[0], panelUnitSpaceHeights[1]]
        }
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Alege distanta dintre lamele" />
        )}
        value={spaceHeight}
        onChange={handlePanelUnitSpaceHeightChange}
      />

      <Autocomplete
        options={panelColors}
        sx={{ width: 300 }}
        getOptionLabel={(option) => option.key}
        autoHighlight
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box key={key} component="li" {...optionProps}>
              <svg
                width={40}
                height={40}
                className="m-2"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label={option.key}
                style={{ display: "block" }}
              >
                <rect width="40" height="40" fill={option.color} />
              </svg>{" "}
              {option.key}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Alege culoarea panourilor"
            slotProps={{
              input: {
                ...params.InputProps,
                startAdornment: colorConfig.color ? (
                  <InputAdornment position="start">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 40 40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" fill={colorConfig.color} />
                    </svg>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        )}
        value={colorConfig}
        onChange={handlePanelColorChange}
      />
    </Box>
  );
}
