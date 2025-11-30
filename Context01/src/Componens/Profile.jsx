import React,{useState,useContext, use} from "react";
import Usercontext from "../Context/UserContext.js";
import UserContextProvider from "../Context/UserContextProvider.jsx";


function Profile(){
    const {User}=useContext(Usercontext)

    if(!User) return <div>Please Login</div>

    return(
        <>
            <div>
                Welcome {User.username}
            </div>
        </>
    )
}

export default Profile