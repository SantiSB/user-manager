import { useContext } from 'react'
import DeleteUserModal from '../components/DeleteUserModal'
import EditUserModal from '../components/EditUserModal'
import { StoreContext } from '../../store/StoreProvider'

function useTableContent() {
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

  return {
    columns,
    rows,
  }
}

export default useTableContent
