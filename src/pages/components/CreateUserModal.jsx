import { useState, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { StoreContext } from '../../store/StoreProvider'
import { types } from '../../store/StoreReducer'
import formFields from '../utils/formFields'

function CreateUserModal() {
  const [store, dispatch] = useContext(StoreContext)
  const [open, setOpen] = useState(false)
  const { control, handleSubmit, reset } = useForm()

  const createUser = (data) => {
    const newUser = {
      id: store.usersData.length + 1,
      ...data,
    }
    dispatch({ type: types.createUser, payload: newUser })
    setOpen(false)
    dispatch({ type: types.handleNotification })
  }

  const cancelCreation = () => {
    reset()
    setOpen(false)
  }

  return (
    <div>
      <Button variant='contained' onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Create User
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <form>
            {formFields.map(({ name, label, type }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                defaultValue=''
                render={({ field, fieldState }) => (
                  <TextField
                    margin='dense'
                    id={name}
                    label={label}
                    type={type}
                    fullWidth
                    variant='standard'
                    error={Boolean(fieldState.error)}
                    helperText={
                      fieldState.error ? fieldState.error.message : ''
                    }
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    onFocus={field.onFocus}
                  />
                )}
              />
            ))}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelCreation} color='error'>
            Cancel
          </Button>
          <Button onClick={handleSubmit(createUser)} variant='outlined'>
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateUserModal
