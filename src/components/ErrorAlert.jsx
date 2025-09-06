import { Alert, Snackbar } from '@mui/material'
function ErrorAlert() {

    return (
      <>
        <Snackbar open={open} autoHideDuration={6000}>
            <Alert
                onClose={() => {}}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
            >
                Blog published successfully!
            </Alert>
        </Snackbar>
      </>
    )
  }
  
  export default ErrorAlert