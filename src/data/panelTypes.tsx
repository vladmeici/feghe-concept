export type PanelTypeId = "vertical" | "horizontal";
export type PanelUnitSpaceId = "lowRange" | "mediumRange" | "highRange";
export type PanelColorId =
  | "RAL 7005"
  | "RAL 7016"
  | "RAL 7042"
  | "RAL 9005"
  | "RAL 9006"
  | "RAL 9016"
  | "RAL 3009"
  | "RAL 3016"
  | "RAL 8003"
  | "RAL 8004"
  | "RAL 8011"
  | "RAL 8017"
  | "RAL 8019"
  | "RAL 8023"
  | "RAL 5010"
  | "RAL 5012"
  | "RAL 6000"
  | "RAL 6005";

export interface PanelType {
  key: PanelTypeId;
  label: string;
}

export interface PanelUnitSpace {
  key: PanelUnitSpaceId;
  range: [number, number];
  label: string;
}

export interface PanelColor {
  key: PanelColorId;
  color: string;
}

export const panelColors: PanelColor[] = [
  { key: "RAL 7005", color: "#6B6E6B" },
  { key: "RAL 7016", color: "#353C40" },
  { key: "RAL 7042", color: "#8C9190" },
  { key: "RAL 9005", color: "#0A0C10" },
  { key: "RAL 9006", color: "#A5A5A5" },
  { key: "RAL 9016", color: "#F0EFE9" },
  { key: "RAL 3009", color: "#6B322A" },
  { key: "RAL 3016", color: "#B32821" },
  { key: "RAL 8003", color: "#734222" },
  { key: "RAL 8004", color: "#8C4831" },
  { key: "RAL 8011", color: "#583421" },
  { key: "RAL 8017", color: "#422A23" },
  { key: "RAL 8019", color: "#3A3333" },
  { key: "RAL 8023", color: "#A35629" },
  { key: "RAL 5010", color: "#0E294B" },
  { key: "RAL 5012", color: "#0086B2" },
  { key: "RAL 6000", color: "#327662" },
  { key: "RAL 6005", color: "#114232" },
];

export const panelUnitHeights: number[] = [30, 60, 80, 100, 120, 150];

export const panelUnitSpaceHeights: PanelUnitSpace[] = [
  { key: "lowRange", range: [0.8, 1.5], label: "mica (8-15mm)" },
  { key: "mediumRange", range: [1.5, 2.5], label: "medie (15-25mm)" },
  { key: "highRange", range: [2.5, 3.5], label: "mare (25-35mm)" },
];

export const panelTypes: PanelType[] = [
  {
    key: "vertical",
    label: "Orientare pe verticala",
  },
  {
    key: "horizontal",
    label: "Orientare pe orizontala",
  },
];
