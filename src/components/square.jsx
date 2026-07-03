import React, { useEffect, useState } from "react";
import { getBackGroudColor, getColor } from "../utilFunctions/utils.js";
import "./square.css";

function Square({
  id,
  val,
  isVisible,
  handleLeftClick,
  handleRightClick,
  isFlag,
  row,
  column,
  isCurrentClickCellId,
}) {
  const [backgroundColor, setBackGroudColor] = useState(
    getBackGroudColor(
      { row, column },
      val,
      isVisible,
      isFlag,
      isCurrentClickCellId,
    ),
  );

  useEffect(() => {
    setBackGroudColor(
      getBackGroudColor(
        { row, column },
        val,
        isVisible,
        isFlag,
        isCurrentClickCellId,
      ),
    );
  }, [isVisible, isFlag, isCurrentClickCellId, row, column, val]);

  const bomb = "0x1F4A3";

  const renderValue = () => {
    if (val === -1) return String.fromCodePoint(bomb);
    if (val === 0) return "";
    const color = getColor(val);
    return <span style={{ color: color, fontWeight: 700 }}>{val}</span>;
  };

  const renderFlag = () => "🚩";

  const handleContextMenuClick = (e) => {
    e.preventDefault();
    handleRightClick(id);
  };

  const handleClick = () => {
    handleLeftClick(id);
  };

  const handleMouseEnter = () => {
    if (isVisible) return;
    setBackGroudColor("rgba(20, 184, 166, 0.08)");
  };

  const handleMouseOut = () => {
    if (isVisible) return;
    setBackGroudColor(
      getBackGroudColor(
        { row, column },
        val,
        isVisible,
        isFlag,
        isCurrentClickCellId,
      ),
    );
  };

  const classNames = [
    "square",
    isVisible ? "square--visible" : "",
    isCurrentClickCellId ? "square--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classNames}
      style={{ backgroundColor }}
      onClick={handleClick}
      onContextMenu={handleContextMenuClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
      aria-label={`Cell ${id}`}
    >
      {isVisible ? renderValue() : isFlag ? renderFlag() : ""}
    </button>
  );
}

export default Square;
