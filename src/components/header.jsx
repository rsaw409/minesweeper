import React, { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Snackbar from "@mui/material/Snackbar";
import { restartGameFn } from "../utilFunctions/action.js";
import { StateContext } from "../App";
import "./header.css";

function Header() {
  const [state, dispatch] = useContext(StateContext);
  const [snackBar, setSnackBar] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const shareUrl = async () => {
    const shareData = {
      title: "MINESWEEPER",
      text: "Try Out This Game!",
      url: window.location.href,
    };
    if (navigator.share && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSnackBar(true);
    }
  };

  return (
    <>
      <div className="header-bar">
        <button
          type="button"
          className="header-bar__button"
          onClick={() => restartGameFn(dispatch)}
        >
          <span>{state.level}</span>
          <ArrowDropDownIcon />
        </button>

        <div className="header-bar__flag">
          <FlagIcon style={{ color: "#f87171" }} />
          <span>{state.noOfFlags}</span>
        </div>

        <div className="header-bar__action-group">
          <IconButton
            size="large"
            aria-label="Volume Button"
            sx={{ color: "white" }}
            onClick={() =>
              dispatch({
                type: "toggleSound",
              })
            }
          >
            {state.isSoundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>

          <IconButton
            size="large"
            aria-label="Share Application Link"
            onClick={shareUrl}
            sx={{ color: "white" }}
          >
            <ShareIcon />
          </IconButton>
        </div>
      </div>

      <Snackbar
        open={snackBar}
        autoHideDuration={3000}
        message="Share Not Supported... Link copied in clipboard!"
        onClose={handleClose}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default Header;
