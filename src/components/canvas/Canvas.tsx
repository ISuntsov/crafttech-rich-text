import { useState, useCallback, RefObject, memo } from "react";
import { Layer, Stage } from "react-konva";
import Konva from "konva";

import Shape from "../shape/Shape";
import { Figure, Tool } from "../../types";
import { KonvaEventObject } from "konva/lib/Node";

interface CanvasProps {
  tool: Tool;
  stageRef: RefObject<Konva.Stage>;
}

const Canvas = ({ tool, stageRef }: CanvasProps) => {
  const [figures, setFigures] = useState<Figure[]>([]);

  const handleOnClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (tool === "cursor") return;

      const stage = e.target.getStage();
      if (!stage) return;

      const point = stage.getPointerPosition();
      const stageOffset = stage.absolutePosition();
      if (!point || !stageOffset) return;

      const newFigure: Figure = {
        id: Date.now().toString(36),
        width: 100,
        height: 100,
        type: "rect",
        x: point.x - stageOffset.x,
        y: point.y - stageOffset.y,
        html: "",
        text: "",
        textStyles: {
          fontWeight: "normal",
          fontSize: 16,
          color: "#000000",
        },
      };

      setFigures((prev) => [...prev, newFigure]);
    },
    [tool]
  );

  const handleUpdateFigure = useCallback((updatedFigure: Figure) => {
    setFigures((prev) =>
      prev.map((figure) =>
        figure.id === updatedFigure.id ? updatedFigure : figure
      )
    );
  }, []);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === "cursor"}
      onClick={handleOnClick}
      ref={stageRef}>
      <Layer>
        {figures.map((figure) => (
          <Shape
            key={figure.id}
            figure={figure}
            tool={tool}
            onUpdate={handleUpdateFigure}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default memo(Canvas);
