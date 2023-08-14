import { createContext, useReducer, useMemo } from 'react'
import PropTypes from 'prop-types'
import storeReducer, { initialStore } from './StoreReducer'

const StoreContext = createContext()

function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore)

  const contextValue = useMemo(() => [store, dispatch], [store, dispatch])

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { StoreContext }
export default StoreProvider
