import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const steps = [
  "Model",
  "Dimensiuni",
  "Panouri",
  "Porti pietonale",
  "Porti auto",
  "Oferta",
];

interface StepperProps {
  currentStep: number;
  onStepChange: React.Dispatch<React.SetStateAction<number>>;
}

export default function FenceConfiguratorStepper(props: StepperProps) {
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(props.currentStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(props.currentStep);
    }

    props.onStepChange((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    props.onStepChange((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <IconButton
          aria-label="back"
          color="inherit"
          disabled={props.currentStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Stepper activeStep={props.currentStep} sx={{ width: "100%" }}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps} className="select-none">
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box sx={{ flex: "1 1 auto" }} />

        <IconButton
          color="inherit"
          aria-label="forward"
          onClick={handleNext}
          disabled={props.currentStep === steps.length - 1}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
