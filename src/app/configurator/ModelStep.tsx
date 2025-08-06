import { Autocomplete, TextField } from "@mui/material";
import { FenceConfiguration, FenceModels } from "./page";
import { BlockModel, blocks } from "@/data/blocks";
import { SyntheticEvent } from "react";
import { FenceType, fenceTypes } from "@/data/fenceTypes";

interface ModelStepProps {
  fenceConfiguration: FenceConfiguration;
  setFenceConfiguration: React.Dispatch<
    React.SetStateAction<FenceConfiguration>
  >;
}

export default function ModelStep(props: ModelStepProps) {
  const handleModelChange =
    (key: keyof FenceModels) =>
    (_: SyntheticEvent, value: BlockModel | null) => {
      if (!value) return;
      props.setFenceConfiguration((prevConfig) => ({
        ...prevConfig,
        models: {
          ...prevConfig.models,
          [key]: value,
        },
      }));
    };
  const handleFenceTypeChange =
    () => (_: SyntheticEvent, value: FenceType | null) => {
      if (!value) return;
      props.setFenceConfiguration((prevConfig) => ({
        ...prevConfig,
        fenceType: value,
      }));
    };

  return (
    <>
      <Autocomplete
        disablePortal
        options={fenceTypes}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Alege tipul de gard" />
        )}
        value={props.fenceConfiguration.fenceType}
        onChange={handleFenceTypeChange()}
      />
      <Autocomplete
        disablePortal
        options={blocks}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Alege modelul de boltar" />
        )}
        value={props.fenceConfiguration.models.blockModel}
        onChange={handleModelChange("blockModel")}
      />
      <Autocomplete
        disablePortal
        options={blocks}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Alege modelul de capac" />
        )}
        value={props.fenceConfiguration.models.capModel}
        onChange={handleModelChange("capModel")}
      />
    </>
  );
}
