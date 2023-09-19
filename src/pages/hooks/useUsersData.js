import { useEffect, useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../../store/StoreProvider'
import { types } from '../../store/StoreReducer'

const BASE_URL = 'https://jsonplaceholder.typicode.com/users'

function useUserData() {
  const [, dispatch] = useContext(StoreContext)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(BASE_URL)
        dispatch({ type: types.setUsers, payload: response.data })
      } catch (error) {
        throw new Error(error)
      }
    }
    fetchData()
  }, [dispatch])

  return {}
}

export default useUserData
