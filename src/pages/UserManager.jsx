import {
  AppBar,
  CssBaseline,
  Box,
  Toolbar,
  Typography,
  Container,
  ThemeProvider,
} from '@mui/material'
import UsersTable from './components/UsersTable'
import CreateUserModal from './components/CreateUserModal'
import Notification from './components/Notification'
import useUserData from './hooks/useUsersData'
import theme from './utils/theme'

function UserManager() {
  useUserData()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='relative' color='secondary'>
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            User Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box sx={{ bgcolor: 'background.paper', pt: 5 }}>
          <Container maxWidth='md'>
            <Typography
              variant='h5'
              align='center'
              color='text.primary'
              gutterBottom
            >
              Simplify User Data Management: Effortlessly Create, Read, Update,
              and Delete
            </Typography>
          </Container>
        </Box>
        <Container maxWidth='lg'>
          <CreateUserModal />
          <UsersTable />
          <Notification message='Successfully Done' />
        </Container>
      </main>
    </ThemeProvider>
  )
}

export default UserManager
