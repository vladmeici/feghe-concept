import {
  Box,
  Card,
  CardContent,
  Grid,
  Input,
  Slider,
  Typography,
} from "@mui/material";
import { FenceConfiguration } from "./page";
import { useCallback, useEffect, useState } from "react";

interface DimensionsStepProps {
  fenceConfiguration: FenceConfiguration;
  setFenceConfiguration: React.Dispatch<
    React.SetStateAction<FenceConfiguration>
  >;
}

const MAX_LENGTH = 100;
const MIN_LENGTH = 2;
const MAX_HEIGHT = 3;
const MIN_HEIGHT = 1;
const MAX_BASE_HEIGHT = 2.6;
const MIN_BASE_HEIGHT = 0.4;

interface DimensionControlProps {
  label: string;
  value: number;
  inputValue: number;
  step: number;
  min: number;
  max: number;
  onChangeValue: (val: number) => void;
  onChangeInput: (val: number) => void;
}

function DimensionControl({
  label,
  value,
  inputValue,
  step,
  min,
  max,
  onChangeValue,
  onChangeInput,
}: DimensionControlProps) {
  const handleSliderChange = (_: Event, newValue: number) => {
    onChangeValue(newValue);
    onChangeInput(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? min : Number(e.target.value);
    onChangeInput(val);
  };

  const commitChange = () => {
    let val = inputValue;
    if (val < min) val = min;
    if (val > max) val = max;
    val = Number((Math.round(val / step) * step).toFixed(2));
    onChangeValue(val);
    onChangeInput(val);
  };

  return (
    <Card className="w-2/5" variant="outlined">
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {label} - multiplu de {step}
        </Typography>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid size="grow">
            <Slider
              step={step}
              min={min}
              max={max}
              value={value}
              valueLabelDisplay="auto"
              onChange={handleSliderChange}
            />
          </Grid>
          <Grid>
            <Input
              value={inputValue}
              size="small"
              onChange={handleInputChange}
              onBlur={commitChange}
              onKeyDown={(e) => e.key === "Enter" && commitChange()}
              inputProps={{
                step,
                min,
                max,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default function DimensionsStep({
  fenceConfiguration,
  setFenceConfiguration,
}: DimensionsStepProps) {
  const { fenceType, dimensions, models } = fenceConfiguration;
  const { length, height, baseHeight } = dimensions;
  const { blockModel } = models;

  const blockWidth = blockModel.width || 1;
  const blockHeight = blockModel.height || 1;

  const [lengthInput, setLengthInput] = useState(length);
  const [heightInput, setHeightInput] = useState(height);
  const [baseHeightInput, setBaseHeightInput] = useState(baseHeight);

  const updateDimension = useCallback(
    (field: keyof typeof dimensions, value: number) => {
      setFenceConfiguration((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [field]: value,
        },
      }));
    },
    [setFenceConfiguration]
  );

  const stepLength = blockWidth / 100;
  const stepHeight = blockHeight / 100;

  let baseHeightWithOffset = baseHeight + 0.4;
  baseHeightWithOffset = Math.floor(baseHeightWithOffset * 10) / 10;

  useEffect(() => {
    if (fenceType.key === "withPanels" && height < baseHeightWithOffset) {
      updateDimension("height", baseHeightWithOffset);
    }
  }, [baseHeightWithOffset, fenceType.key, height, updateDimension]);

  return (
    <Box className="flex w-full gap-2 justify-around">
      <DimensionControl
        label="Lungime gard (metri)"
        value={length}
        inputValue={lengthInput}
        step={stepLength}
        min={MIN_LENGTH}
        max={MAX_LENGTH}
        onChangeValue={(val) => updateDimension("length", val)}
        onChangeInput={setLengthInput}
      />

      {fenceType.key === "withPanels" && (
        <DimensionControl
          label="Inaltime soclu (m)"
          value={baseHeight}
          inputValue={baseHeightInput!}
          step={stepHeight}
          min={MIN_BASE_HEIGHT}
          max={MAX_BASE_HEIGHT}
          onChangeValue={(val) => updateDimension("baseHeight", val)}
          onChangeInput={setBaseHeightInput}
        />
      )}

      <DimensionControl
        label="Inaltime gard (m)"
        value={height}
        inputValue={heightInput}
        step={stepHeight}
        min={fenceType.key === "withPanels" ? baseHeightWithOffset : MIN_HEIGHT}
        max={MAX_HEIGHT}
        onChangeValue={(val) => updateDimension("height", val)}
        onChangeInput={setHeightInput}
      />
    </Box>
  );
}
