import { DataGrid } from '@mui/x-data-grid'
import { Box, Paper } from '@mui/material'
import useTableContent from '../hooks/useTableContent'

function UsersTable() {

  const { columns, rows } = useTableContent()

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
