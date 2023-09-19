import { useContext, useState } from 'react'
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

  const deleteUser = () => {
    dispatch({ type: types.deleteUser, payload: cellValues.row })
    setOpen(false)
    dispatch({ type: types.handleNotification })
  }

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        color='primary'
        aria-label='delete user'
        component='label'
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='error'>
            Cancel
          </Button>
          <Button onClick={deleteUser} variant='outlined' color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

DeleteUserModal.propTypes = {
  cellValues: PropTypes.node.isRequired,
}

export default DeleteUserModal
