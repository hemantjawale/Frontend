import {createSlice} from '@reduxjs/toolkit'

const initalState={
    status:false,
    useData:null
}

const authSlice = createSlice({
    name:"auth",
    initalState,
    reducers:{
        login:(state,action)=>{
            state.status=true
            state.userData=action.payload.userData
        },
        logout:(state)=>{
            state.status=false;
            state.useData=null;
        }
    }
})

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;
