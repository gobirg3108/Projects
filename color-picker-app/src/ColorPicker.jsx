import { useState } from "react";
function ColorPicker() {
  const [color, setColor] = useState("#ffffff");

  function handleColorChange(event) {
    setColor(event.target.value);
  }

  return (
    <div className="color-picker-container">
      <h1>Color Picker</h1>

      <div
        className="color-display"
        style={{ backgroundColor: color || "#ffffff" }}
      >
        <p>Selected Color: {color}</p>
      </div>

      <label htmlFor="color-input">Select a Color</label>
      <input
        id="color-input"
        type="color"
        value={color}
        onChange={handleColorChange}
      />
    </div>
  );
}

export default ColorPicker;
