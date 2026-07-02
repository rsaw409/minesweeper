import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
  useLayoutEffect,
} from "react";
import useSound from "use-sound";
import Square from "./square";
import { getNoOfColumns } from "../utilFunctions/utils.js";
import {
  placeFlagFunction,
  handleClick as handleClickInAction,
} from "../utilFunctions/action.js";
import rightSound from "../assets/right.wav";
import gameWinSound from "../assets/gameWin.wav";
import gameOver from "../assets/gameOver.wav";
import placeFlagSound from "../assets/placeFlag.wav";
import { StateContext } from "../App";
import "./board.css";

function Board() {
  const [state, dispatch] = useContext(StateContext);
  const columns = useMemo(() => getNoOfColumns(state.level), [state.level]);
  const rows = state.board.length;

  const calculateBoardLayout = React.useCallback(
    (viewportWidth, viewportHeight, headerHeight = 0) => {
      const isPortrait = viewportHeight >= viewportWidth;
      const horizontalMargin = isPortrait ? 28 : 44;
      const verticalMargin = isPortrait ? 108 : 84;
      const boardPadding = 14;
      const headerOffset = headerHeight + 20;
      const gap = Math.max(2, Math.min(6, Math.round(72 / columns)));
      const borderWidth = columns >= 20 ? 0.5 : columns >= 16 ? 0.8 : 1;

      const availableWidth = Math.max(
        viewportWidth - horizontalMargin - boardPadding * 2,
        0,
      );
      const availableHeight = Math.max(
        viewportHeight - verticalMargin - boardPadding * 2 - headerOffset,
        0,
      );

      const cellWidth = Math.max(
        16,
        Math.floor((availableWidth - gap * (columns - 1)) / columns),
      );
      const cellHeight = Math.max(
        16,
        Math.floor((availableHeight - gap * (rows - 1)) / rows),
      );

      return {
        cellWidth,
        cellHeight,
        gap,
        borderWidth,
        width: cellWidth * columns + gap * (columns - 1) + boardPadding * 2,
        height: cellHeight * rows + gap * (rows - 1) + boardPadding * 2,
      };
    },
    [columns, rows],
  );

  const getHeaderHeight = React.useCallback(
    () => document.querySelector(".header-bar")?.offsetHeight || 0,
    [],
  );

  const getInitialBoardSize = () => {
    const viewportWidth = window.visualViewport?.width || window.innerWidth;
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    return calculateBoardLayout(
      viewportWidth,
      viewportHeight,
      getHeaderHeight(),
    );
  };

  const [boardSize, setBoardSize] = useState(getInitialBoardSize);

  const [playRightMoveSound] = useSound(rightSound, {
    soundEnabled: state.isSoundEnabled,
  });
  const [playGameWinSound] = useSound(gameWinSound, {
    soundEnabled: state.isSoundEnabled,
  });
  const [playGameOverSound] = useSound(gameOver, {
    soundEnabled: state.isSoundEnabled,
  });
  const [playPlaceFlagSound] = useSound(placeFlagSound, {
    soundEnabled: state.isSoundEnabled,
  });

  useLayoutEffect(() => {
    const updateSize = () => {
      const viewportWidth = window.visualViewport?.width || window.innerWidth;
      const viewportHeight =
        window.visualViewport?.height || window.innerHeight;
      setBoardSize(
        calculateBoardLayout(viewportWidth, viewportHeight, getHeaderHeight()),
      );
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [calculateBoardLayout, getHeaderHeight]);

  const handleRightClick = (id) => {
    placeFlagFunction(
      id,
      state,
      dispatch,
      playPlaceFlagSound,
      playGameWinSound,
    );
  };

  const handleClick = (id) => {
    handleClickInAction(
      id,
      state,
      dispatch,
      playRightMoveSound,
      playGameOverSound,
      playGameWinSound,
    );
  };

  return (
    <div className="board-wrapper">
      <div
        className="board"
        style={{
          width: `${boardSize.width}px`,
          height: `${boardSize.height}px`,
          gridTemplateColumns: `repeat(${columns}, ${boardSize.cellWidth}px)`,
          gridAutoRows: `${boardSize.cellHeight}px`,
          gap: `${boardSize.gap}px`,
          "--cell-gap": `${boardSize.gap}px`,
          "--cell-border": `${boardSize.borderWidth}px`,
          "--cell-radius": `${Math.max(1, Math.min(4, Math.round(boardSize.cellWidth / 9)))}px`,
        }}
      >
        {state.board.flat().map((each) => (
          <Square
            key={each.id}
            id={each.id}
            row={Math.floor(each.id / columns)}
            column={each.id % columns}
            val={each.val}
            isVisible={each.isVisible}
            isFlag={each.isFlag}
            handleLeftClick={handleClick}
            handleRightClick={handleRightClick}
            isCurrentClickCellId={state.currentClickCellId === each.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
