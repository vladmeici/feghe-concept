import { Box, Card, CardContent, Slider, Typography } from "@mui/material";
import { FenceConfiguration } from "./page";

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

export default function DimensionsStep(props: DimensionsStepProps) {
  const fenceLength = props.fenceConfiguration.dimensions.length;
  const fenceHeight = props.fenceConfiguration.dimensions.height;
  const blockWidth = props.fenceConfiguration.models.blockModel.width;
  const blockHeight = props.fenceConfiguration.models.blockModel.height;

  const handleLengthChange = (_: Event, newValue: number) => {
    props.setFenceConfiguration((prevConfig) => ({
      ...prevConfig,
      dimensions: {
        ...prevConfig.dimensions,
        length: newValue,
      },
    }));
  };
  const handleHeightChange = (_: Event, newValue: number) => {
    props.setFenceConfiguration((prevConfig) => ({
      ...prevConfig,
      dimensions: {
        ...prevConfig.dimensions,
        height: newValue,
      },
    }));
  };

  return (
    <>
      <Box sx={{ minWidth: 300 }}>
        <Card variant="outlined">
          <CardContent sx={{ padding: "20px" }}>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Lungime gard (m) - multiplu de {blockWidth / 100}
            </Typography>
            <Slider
              step={blockWidth / 100}
              max={MAX_LENGTH}
              min={MIN_LENGTH}
              value={fenceLength}
              valueLabelDisplay="auto"
              onChange={handleLengthChange}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">{MIN_LENGTH} m</Typography>
              <Typography variant="body2">{MAX_LENGTH} m</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Inaltime gard (m) - multiplu de {blockHeight / 100}
            </Typography>
            <Slider
              value={fenceHeight}
              step={blockHeight / 100}
              max={MAX_HEIGHT}
              min={MIN_HEIGHT}
              onChange={handleHeightChange}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
