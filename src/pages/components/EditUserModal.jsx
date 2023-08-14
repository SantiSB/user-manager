import { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { StoreContext } from '../../store/StoreProvider'
import { types } from '../../store/StoreReducer'

function EditUserModal({ cellValues }) {
  const [, dispatch] = useContext(StoreContext)

  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: cellValues.row.name,
    username: cellValues.row.username,
    email: cellValues.row.email,
    phone: cellValues.row.phone,
  })

  useEffect(() => {
    setFormData({
      name: cellValues.row.name,
      username: cellValues.row.username,
      email: cellValues.row.email,
      phone: cellValues.row.phone,
    })
  }, [cellValues.row])

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const updateUser = () => {
    const newUser = {
      id: cellValues.row.id,
      ...formData,
    }

    dispatch({ type: types.updateUser, payload: newUser })
    setOpen(false)
    dispatch({ type: types.handleNotification })
  }

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        color="primary"
        aria-label="upload picture"
        component="label"
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {Object.keys(formData).map((field) => (
            <TextField
              key={field}
              margin="dense"
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type="text"
              fullWidth
              variant="standard"
              value={formData[field]}
              onChange={handleInputChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={updateUser} variant="outlined">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

EditUserModal.propTypes = {
  cellValues: PropTypes.shape({
    row: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default EditUserModal
