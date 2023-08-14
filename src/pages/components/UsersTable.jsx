import { useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Paper } from '@mui/material'
import EditUserModal from './EditUserModal'
import DeleteUserModal from './DeleteUserModal'
import { StoreContext } from '../../store/StoreProvider'

function UsersTable() {
  const [store] = useContext(StoreContext)
  const { usersData } = store

  const columns = [
    { field: 'id', headerName: 'ID', width: 75 },
    { field: 'name', headerName: 'Name', width: 225 },
    { field: 'username', headerName: 'User Name', width: 225 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 250 },
    {
      field: 'Actions',
      renderCell: (cellValues) => (
        <>
          <EditUserModal {...{ cellValues }} />
          <DeleteUserModal {...{ cellValues }} />
        </>
      ),
    },
  ]

  const rows = usersData.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
  }))

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[1, 5, 10, 50, 100]}
          />
        </div>
      </Paper>
    </Box>
  )
}

export default UsersTable
