const types = {
  setUserData: 'setUsers',
  createUser: 'createUser',
  deleteUser: 'deleteUser',
  updateUser: 'updateUser',
  handleNotification: 'handleNotification',
}

const initialStore = {
  usersData: [
    {
      id: 'id',
      name: 'name',
      username: 'username',
      email: 'email',
      phone: 'phone',
    },
  ],
  handleNotification: false,
}

const storeReducer = (state, action) => {
  switch (action.type) {
    case types.setUsers:
      return {
        ...state,
        usersData: action.payload,
      }
    case types.deleteUser:
      return {
        ...state,
        usersData: state.usersData.filter(
          (item) => item.id !== action.payload.id
        ),
      }
    case types.updateUser:
      return {
        ...state,
        usersData: state.usersData.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      }
    case types.createUser:
      return {
        ...state,
        usersData: [action.payload, ...state.usersData],
      }
    case types.handleNotification:
      return {
        ...state,
        handleNotification: !state.handleNotification,
      }
    default:
      return state
  }
}

export { initialStore, types }
export default storeReducer
