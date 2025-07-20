import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import { Slide } from "@mui/material";

const CustomSnackbar = ({
  open,
  message,
  severity = "success",
  handleClose,
  autoHideDuration = 6000,
  position = { vertical: "bottom", horizontal: "left" },
  variant = "filled",
  transition = Slide,
  action,
  icon,
  sx = {},
}) => {
  const theme = useTheme();

  // Default styling that can be overridden via sx prop
  const defaultSx = {
    "& .MuiAlert-root": {
      boxShadow: theme.shadows[6],
      borderRadius: "12px",
      alignItems: "center",
    },
    "& .MuiAlert-icon": {
      alignItems: "center",
    },
    ...sx,
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={position}
      TransitionComponent={transition}
      sx={{
        "&.MuiSnackbar-root": {
          [theme.breakpoints.down("sm")]: {
            left: "16px",
            right: "16px",
            bottom: "16px",
          },
        },
      }}
    >
      <MuiAlert
        elevation={6}
        variant={variant}
        onClose={handleClose}
        severity={severity}
        sx={defaultSx}
        action={action}
        icon={icon}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
