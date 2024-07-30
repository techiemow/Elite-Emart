import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  User: null,
}

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
     setUserDetails: (state,action) =>{
        state.User = action.payload;
     

     }
}
})
export const { setUserDetails } = UserSlice.actions
  
export default UserSlice.reducer