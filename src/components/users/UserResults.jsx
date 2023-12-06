import { useEffect,useState } from "react"
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

function UserResults() {
const [users,setUsers] = useState([]);
const [Loading,setLoading] = useState(true)

  useEffect(()=>{
   fetchUsers()
  },[])

  // fetch users
  const fetchUsers = async () =>{
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)

    const data = await response.json()
    setUsers(data)
    setLoading(false)
  }

  if(!Loading){
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'">
        {users.map((user)=>(
         <UserItem key={user.id} user={user}/>
        ))}
      </div>
    )
  }else{
    return <Spinner/>
  }
}

export default UserResults
