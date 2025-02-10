import React from "react";
// sampling colors
const colors = [
  {
    bgColor: "#6f8f70",
    textColor: "#f5f5f5",
    label: "--earth-green, #6f8f70, offwhite",
  },
  {
    bgColor: "#b4c5b5",
    textColor: "#1c1c1c",
    label: "--sage #b4c5b5, charcoal",
  },
  {
    bgColor: "#a48c6c",
    textColor: "#1c1c1c",
    label: "--coffee #a48c6c, charcoal",
  },
  {
    bgColor: "#b0c2b1",
    textColor: "#1c1c1c",
    label: "--mint #b0c2b1, charcoal",
  },
  {
    bgColor: "#394a3a",
    textColor: "#f5f5f5",
    label: "--forest-green #394a3a, offwhite",
  },
  {
    bgColor: "#364752",
    textColor: "#f5f5f5",
    label: "--slate #364752, offwhite",
  },
  {
    bgColor: "#7a5c3f",
    textColor: "#f5f5f5",
    label: "--dark-coffee #7a5c3f, offwhite",
  },
  {
    bgColor: "#2c3e50",
    textColor: "#f5f5f5",
    label: "--teal #2c3e50, offwhite",
  },
  {
    bgColor: "#e9e4d4",
    textColor: "#1c1c1c",
    label: "--sand #e9e4d4, charcoal",
  },
];

const PaletteGrid = () => {
  return (
    <div className="pallete-grid">
      {colors.map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color.bgColor, color: color.textColor }}
          className="color-block"
        >
          <p>{color.label}</p>
        </div>
      ))}
    </div>
  );
};

export default PaletteGrid;
