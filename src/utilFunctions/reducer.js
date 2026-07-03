import { getNoOfBomb, getNoOfFlag } from "./utils";
import getBoard from "./getBoard.js";

export function initStateFn(level) {
  return {
    isSoundEnabled: true,
    level: level,
    noOfFlags: getNoOfFlag(level),
    noOfBombs: getNoOfBomb(level),
    board: getBoard(level),
    isGameOver: false,
    isGameWon: false,
    currentClickCellId: -1,
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case "toggleSound":
      return {
        ...state,
        isSoundEnabled: !state.isSoundEnabled,
      };
    case "setLevel":
      return !state.isGameOver && action.payload === state.level
        ? state
        : {
            ...state,
            level: action.payload,
            noOfFlags: getNoOfFlag(action.payload),
            noOfBombs: getNoOfBomb(action.payload),
            board: getBoard(action.payload),
            isGameOver: false,
            isGameWon: false,
          };
    case "setBoard":
      return {
        ...state,
        board: action.payload.board,
        noOfFlags:
          state.noOfFlags +
          (action.payload.noOfFlags ? action.payload.noOfFlags : 0),
      };
    case "setGameOver":
      return {
        ...state,
        isGameOver: true,
        isGameWon: action.payload.isGameWon,
        board: action.payload.board ?? state.board,
        noOfFlags:
          state.noOfFlags +
          (action.payload.noOfFlags ? action.payload.noOfFlags : 0),
      };
    case "setCurrentClickCellId":
      return {
        ...state,
        currentClickCellId: action.payload,
      };
    case "reloadState":
      return {
        isSoundEnabled: state.isSoundEnabled ?? true,
        level: action.payload.level,
        noOfFlags: getNoOfFlag(action.payload.level),
        noOfBombs: getNoOfBomb(action.payload.level),
        board: getBoard(action.payload.level),
        isGameOver: false,
        isGameWon: false,
        currentClickCellId: -1,
      };
    default:
      return state;
  }
}
