import { useContext, useEffect } from 'react'
import axios from 'axios'
import {
  AppBar,
  CssBaseline,
  Box,
  Toolbar,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material'
import { teal } from '@mui/material/colors'
import { StoreContext } from '../store/StoreProvider'
import { types } from '../store/StoreReducer'
import UsersTable from './components/UsersTable'
import CreateUserModal from './components/CreateUserModal'
import Notification from './utils/Notification'

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: teal[800],
    },
  },
})

const BASE_URL = 'https://jsonplaceholder.typicode.com/users'

function UserManager() {
  const [, dispatch] = useContext(StoreContext)

  useEffect(() => {
    async function usersDataRequest() {
      await axios.get(BASE_URL).then((response) => {
        dispatch({ type: types.setUsers, payload: response.data })
      })
    }
    usersDataRequest()
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            User Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box sx={{ bgcolor: 'background.paper', pt: 5 }}>
          <Container maxWidth="md">
            <Typography
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Manage Your User Data: Create, Read, Update, and Delete with Ease
            </Typography>
          </Container>
        </Box>
        <Container maxWidth="lg">
          <CreateUserModal />
          <UsersTable />
          <Notification />
        </Container>
      </main>
    </ThemeProvider>
  )
}

export default UserManager
