import React,{useState,useContext, use} from "react";
import usercontext from "../Context/UserContext.js";

function Profile(){
    const {user}=useContext(usercontext)

    if(!user) return <div>Please Login</div>

    return(
        <>
            <div>
                Welcome {user.username}
            </div>
        </>
    )
}