import React,{useState,useContext, use} from "react";
import usercontext from "../Context/UserContext.js";


function Login(){

const[username,setUsername]=useState("")
const[password,setpassword]=useState("")

const {setuser}=useContext(usercontext)

const handleSubmit=(e)=>{

    e.preventDefault()
    setuser({username,password})
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