export function getNoOfFlag(level) {
  if (!level) return 0;
  if (window.innerWidth < 720) {
    if (level === "Easy") return 10;
    if (level === "Medium") return 35;
    if (level === "Hard") return 75;
  } else {
    if (level === "Easy") return 10;
    if (level === "Medium") return 40;
    if (level === "Hard") return 99;
  }
}

export function getNoOfBomb(level) {
  if (!level) return 0;
  if (window.innerWidth < 720) {
    if (level === "Easy") return 10;
    if (level === "Medium") return 35;
    if (level === "Hard") return 75;
  } else {
    if (level === "Easy") return 10;
    if (level === "Medium") return 40;
    if (level === "Hard") return 99;
  }
}

export function getNoOfSquare(level) {
  if (window.innerWidth < 720) {
    if (level === "Easy") return 12 * 6;
    if (level === "Medium") return 19 * 10;
    if (level === "Hard") return 26 * 13;
  } else {
    if (level === "Easy") return 8 * 10;
    if (level === "Medium") return 14 * 18;
    if (level === "Hard") return 20 * 24;
  }
}

export function getNoOfRows(level) {
  if (window.innerWidth < 720) {
    if (level === "Easy") return 12;
    if (level === "Medium") return 19;
    if (level === "Hard") return 26;
  } else {
    if (level === "Easy") return 8;
    if (level === "Medium") return 14;
    if (level === "Hard") return 20;
  }
}

export function getNoOfColumns(level) {
  if (window.innerWidth < 720) {
    if (level === "Easy") return 6;
    if (level === "Medium") return 10;
    if (level === "Hard") return 13;
  } else {
    if (level === "Easy") return 10;
    if (level === "Medium") return 18;
    if (level === "Hard") return 24;
  }
}

export function getCellSize(level) {
  if (level === "Easy") return 54;
  if (level === "Medium") return 32;
  if (level === "Hard") return 24;
}

export function getBackGroudColor(
  { row, column },
  val,
  isVisible,
  isFlag,
  isCurrentClickCellId,
) {
  if (isVisible) {
    if (val === -1 && isFlag) return "#14b8a6";
    if (val === -1 && isCurrentClickCellId) return "#F23506";
    else if (row & 1) return column % 2 === 0 ? "#D7B899" : "#E4C29E";
    else return column % 2 !== 0 ? "#D7B899" : "#E4C29E";
  } else {
    if (row & 1) return column % 2 === 0 ? "#dff6ef" : "#ccefe1";
    else return column % 2 !== 0 ? "#dff6ef" : "#ccefe1";
  }
}

export function getColor(val) {
  switch (val) {
    case 1:
      return "#1876D1";
    case 2:
      return "#388E3C";
    case 3:
      return "#EA3306";
    case 4:
      return "#7B1EA2";
    default:
      return "#795548";
  }
}
