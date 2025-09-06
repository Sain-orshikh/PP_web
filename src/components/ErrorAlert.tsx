import { Alert, Snackbar } from '@mui/material'

interface ErrorAlertProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ open, onClose, message }) => {
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert
          onClose={onClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ErrorAlert
