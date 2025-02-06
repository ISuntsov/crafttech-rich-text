import { ChangeEvent, memo } from "react";
import { Tool } from "../../types";

interface ControlProps {
  tool: Tool;
  onToolChange: (tool: Tool) => void;
}

const Control = ({ tool, onToolChange }: ControlProps) => {
  const handleToolChange = (e: ChangeEvent<HTMLInputElement>) => {
    onToolChange(e.target.value as Tool);
  };

  return (
    <div style={{ position: "absolute", top: 0 }}>
      <div>
        <input
          type="radio"
          id="cursor"
          name="control"
          value="cursor"
          checked={tool === "cursor"}
          onChange={handleToolChange}
        />
        <label htmlFor="cursor">Взаимодействие</label>
      </div>

      <div>
        <input
          type="radio"
          id="shape"
          name="control"
          value="shape"
          checked={tool === "shape"}
          onChange={handleToolChange}
        />
        <label htmlFor="shape">Добавление</label>
      </div>
    </div>
  );
};

export default memo(Control);
