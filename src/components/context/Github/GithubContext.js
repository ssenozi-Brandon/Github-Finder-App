import { createContext,useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children})=>{
const initialState = {
  users:[],
  Loading: false,
}

const [state,dispatch] = useReducer(GithubReducer,initialState)

// search users
const searchUsers = async (text) =>{
    setLoading()

    const params = new URLSearchParams({
      q : text
    })

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`)

  const {items} = await response.json()
  
  dispatch({
    type: 'GET_USERS',
    payload: items,
  })
}

// clear users from state
const clearUsers = ()=> dispatch({type: 'CLEAR_USERS'})

// set loading function
const setLoading = ()=> dispatch({type: 'SET_LOADING'})

return <GithubContext.Provider value={{
  users: state.users,
  Loading: state.Loading,
  searchUsers,
  clearUsers
}}>
  {children}
</GithubContext.Provider>

}

export default GithubContext