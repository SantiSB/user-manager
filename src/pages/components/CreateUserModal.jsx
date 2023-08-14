import { useContext, useState, useEffect } from 'react'
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

const formFields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'text' },
]

function CreateUserModal() {
  const [store, dispatch] = useContext(StoreContext)

  const [open, setOpen] = useState(false)

  const [formValues] = useState(
    formFields.reduce((acc, field) => {
      acc[field.name] = ''
      return acc
    }, {})
  )

  const { control, handleSubmit, reset } = useForm({
    defaultValues: formValues,
  })

  useEffect(() => {
    if (!open) {
      reset(formValues)
    }
  }, [open, reset, formValues])

  const onSubmit = (data) => {
    const newUser = {
      id: store.usersData.length + 1,
      ...data,
    }
    dispatch({ type: types.createUser, payload: newUser })
    setOpen(false)
    dispatch({ type: types.handleNotification })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen} sx={{ mb: 2 }}>
        Create User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <form>
            {formFields.map((item) => (
              <Controller
                key={item.name}
                name={item.name}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    margin='dense'
                    id={item.name}
                    label={item.label}
                    type={item.type}
                    fullWidth
                    variant='standard'
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    onFocus={field.onFocus}
                    error={Boolean(fieldState.error)}
                    helperText={
                      fieldState.error ? fieldState.error.message : ''
                    }
                  />
                )}
              />
            ))}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant='outlined'>
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateUserModal
