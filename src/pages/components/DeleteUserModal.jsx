import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { StoreContext } from '../../store/StoreProvider'
import { types } from '../../store/StoreReducer'

function DeleteUserModal({ cellValues }) {
  const [, dispatch] = useContext(StoreContext)

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteUser = () => {
    dispatch({ type: types.deleteUser, payload: cellValues.row })
    setOpen(false)
    dispatch({ type: types.handleNotification })
  }

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        color='primary'
        aria-label='upload picture'
        component='label'
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='error'>
            Cancel
          </Button>
          <Button onClick={deleteUser} variant='outlined' color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

DeleteUserModal.propTypes = {
  cellValues: PropTypes.node.isRequired,
}

export default DeleteUserModal
