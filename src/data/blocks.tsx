export interface BlockModel {
  label: string;
  key: string;
  description: string;
  modelImage: string;
  width: number;
  height: number;
}
export const blocks: BlockModel[] = [
  {
    label: "Rivago brun",
    key: "RivagoBrun",
    description: "TBD",
    modelImage: "/assets/gard/rivago/rivago-brun.jpg",
    width: 40,
    height: 20,
  },
  {
    label: "Rivago gri",
    key: "RivagoGri",
    description: "TBD",
    modelImage: "/assets/gard/rivago/rivago-gri.jpg",
    width: 40,
    height: 20,
  },
  {
    label: "Rivago crem",
    key: "RivagoCrem",
    description: "TBD",
    modelImage: "/assets/gard/rivago/rivago-crem.jpg",
    width: 40,
    height: 20,
  },
];
