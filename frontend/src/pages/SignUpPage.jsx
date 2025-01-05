import React, { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";

function SignUpPage() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true); // Show the Snackbar
  };

  const handleClose = (event, reason) => {
    // Prevent closing if the reason is "clickaway"
    if (reason === "clickaway") {
      return;
    }
    setOpen(false); // Close the Snackbar
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Button to trigger the Snackbar */}
      <Button variant="contained" color="primary" onClick={handleClick}>
        Show Alert
      </Button>

      {/* Snackbar with an Alert */}
      <Snackbar
        open={open}
        autoHideDuration={5000} // Alert stays for 5 seconds
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} variant="filled" severity="error">
          Please fill in all fields!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SignUpPage;