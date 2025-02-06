import { useRef, useState, useCallback, useMemo, memo } from "react";
import Konva from "konva";
import { Group, Rect, Text } from "react-konva";
import { Html } from "react-konva-utils";
import { Figure, Tool } from "../../types";
import TextEditor from "../textEditor/TextEditor";
import "./Shape.scss";

interface ShapeProps {
  figure: Figure;
  tool: Tool;
  onUpdate: (updatedFigure: Figure) => void;
}

const Shape = ({ figure, tool, onUpdate }: ShapeProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const groupRef = useRef<Konva.Group>(null);

  const handleClick = useCallback(() => {
    tool === "cursor" && !isEditing && setIsEditing(true);
  }, [tool, isEditing]);

  const handleTextChange = useCallback(
    (newText: string, styles: typeof figure.textStyles) => {
      onUpdate({
        ...figure,
        text: newText,
        textStyles: styles,
      });
      setIsEditing(false);
    },
    [figure.textStyles]
  );

  const konvaTextStyles = useMemo(() => {
    return {
      fontStyle: figure.textStyles.fontWeight === "bold" ? "bold" : "normal",
      fontSize: figure.textStyles.fontSize,
      fill: figure.textStyles.color,
    };
  }, [figure.textStyles]);

  const handleCancel = useCallback(() => setIsEditing(false), []);

  return (
    <>
      <Group
        x={figure.x}
        y={figure.y}
        ref={groupRef}
        draggable={tool === "cursor"}
        onClick={handleClick}>
        <Rect
          width={figure.width}
          height={figure.height}
          stroke="#000"
          strokeWidth={1}
        />

        {!isEditing && figure.text && (
          <Text
            text={figure.text}
            width={figure.width}
            height={figure.height}
            align="center"
            verticalAlign="middle"
            {...konvaTextStyles}
          />
        )}

        {isEditing && (
          <Html>
            <TextEditor
              initialText={figure.text}
              initialStyles={figure.textStyles}
              onSave={handleTextChange}
              onCancel={handleCancel}
            />
          </Html>
        )}
      </Group>
    </>
  );
};

export default memo(Shape);
