import { ChangeEvent, useCallback, useState } from "react";
import { Figure } from "../../types";
import "./TextEditor.scss";

interface TextEditorProps {
  initialText: string;
  initialStyles: Figure["textStyles"];
  onSave: (text: string, styles: Figure["textStyles"]) => void;
  onCancel: () => void;
}

const TextEditor = ({
  initialText,
  initialStyles,
  onSave,
  onCancel,
}: TextEditorProps) => {
  const [text, setText] = useState(initialText);
  const [styles, setStyles] = useState(initialStyles);

  const toggleBold = useCallback(() => {
    setStyles((prev) => ({
      ...prev,
      fontWeight: prev.fontWeight === "bold" ? "normal" : "bold",
    }));
  }, []);

  const handleFontChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setStyles((prev) => ({
        ...prev,
        fontSize: Number(e.target.value),
      })),
    []
  );

  const handleColoreChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setStyles((prev) => ({
        ...prev,
        color: e.target.value,
      })),
    []
  );

  const handleSave = useCallback(() => {
    onSave(text, styles);
  }, [text, styles, onSave]);

  const handleChangeText = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );

  return (
    <div className="text-editor">
      <div className="toolbar">
        <button
          onClick={toggleBold}
          className={styles.fontWeight === "bold" ? "active" : ""}>
          B
        </button>
        <input
          type="number"
          value={styles.fontSize}
          onChange={handleFontChange}
        />
        <input
          type="color"
          value={styles.color}
          onChange={handleColoreChange}
        />
      </div>

      <textarea
        value={text}
        onChange={handleChangeText}
        style={{
          fontWeight: styles.fontWeight,
          fontSize: `${styles.fontSize}px`,
          color: styles.color,
        }}
      />

      <div className="buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TextEditor;
