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

  const { row } = cellValues
  const { name: initialName, username, email, phone } = row
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: initialName,
    username,
    email,
    phone,
  })

  useEffect(() => {
    setFormData({
      name: initialName,
      username,
      email,
      phone,
    })
  }, [initialName, username, email, phone])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const editUser = () => {
    const newUser = {
      id: row.id,
      ...formData,
    }
    dispatch({ type: types.updateUser, payload: newUser })
    setOpen(false)
    dispatch({ type: types.handleNotification })
  }

  return (
    <div>
      <IconButton
        onClick={() => setOpen(true)}
        color='primary'
        aria-label='upload picture'
        component='label'
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {Object.keys(formData).map((field) => (
            <TextField
              key={field}
              margin='dense'
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type='text'
              fullWidth
              variant='standard'
              value={formData[field]}
              onChange={handleInputChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='error'>
            Cancel
          </Button>
          <Button onClick={editUser} variant='outlined'>
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
