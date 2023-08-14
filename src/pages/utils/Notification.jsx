import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { StoreContext } from '../../store/StoreProvider'
import { types } from '../../store/StoreReducer'

const Alert = React.forwardRef(
  (
    { elevation = 6, variant = 'filled', onClose, severity, sx, children },
    ref
  ) => (
      <MuiAlert
        elevation={elevation}
        ref={ref}
        variant={variant}
        onClose={onClose}
        severity={severity}
        sx={sx}
      >
        {children}
      </MuiAlert>
    )
)

const sxShape = PropTypes.shape({
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
})

Alert.propTypes = {
  elevation: PropTypes.number.isRequired,
  variant: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
  sx: sxShape.isRequired, 
  children: PropTypes.node.isRequired,
}

Alert.displayName = 'Alert'

function Notification() {
  const [store, dispatch] = useContext(StoreContext)

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch({ type: types.handleNotification })
  }

  return (
    <Snackbar
      open={store.handleNotification}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
        Successfully Done
      </Alert>
    </Snackbar>
  )
}

export default Notification
