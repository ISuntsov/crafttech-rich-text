import { useCallback, useRef, useState } from "react";
import { Stage } from "konva/lib/Stage";

import "./App.css";
import Canvas from "./components/canvas/Canvas";
import Control from "./components/control/Control";
import { Tool } from "./types";

function App() {
  const [tool, setTool] = useState<Tool>("cursor");
  const stageRef = useRef<Stage>(null);

  const handleToolChange = useCallback((newTool: Tool) => {
    setTool(newTool);
  }, []);

  return (
    <>
      <Canvas tool={tool} stageRef={stageRef} />
      <Control tool={tool} onToolChange={handleToolChange} />
    </>
  );
}

export default App;
