//reducer-> initial aur final state batane mein help krta hai
import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth'
const store=configureStore({
    reducer:{
        auth:authReducer, 
    },
});

export default store;