export type FenceTypeId = "withPanels" | "fullBlocks";

export interface FenceType {
  key: FenceTypeId;
  label: string;
}

export const fenceTypes: FenceType[] = [
  {
    key: "withPanels",
    label: "Gard cu panouri",
  },
  {
    key: "fullBlocks",
    label: "Gard plin",
  },
];
