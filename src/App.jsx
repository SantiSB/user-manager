import { Routes, Route, HashRouter } from 'react-router-dom'
import UserManager from './pages/UserManager'
import StoreProvider from './store/StoreProvider'

function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<UserManager />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  )
}

export default App
