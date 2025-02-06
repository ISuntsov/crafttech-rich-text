export interface Figure {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "rect" | "circle";
  text: string;
  html: string;
  fill?: string;
  stroke?: string;
  textStyles: {
    fontWeight: string;
    fontSize: number;
    color: string;
  };
}

export type Tool = "cursor" | "shape";
