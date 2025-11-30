import React,{useState,useContext} from "react";
import Usercontext from "../Context/UserContext.js";
import UserContextProvider from "../Context/UserContextProvider.jsx";


function Login(){

const[username,setUsername]=useState("")
const[password,setpassword]=useState("")

const {setUser}=useContext(Usercontext)

const handleSubmit=(e)=>{

    e.preventDefault()
    setUser({username,password})
}

    return(
        <>
            <div>
                <h2>Login</h2>
                <input type="text" value={username} 
                placeholder="username"
                onChange={(e)=>setUsername(e.target.value)} />
                <input type="text"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                placeholder="password" />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </>
    )
}

export default Login