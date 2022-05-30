import React, {createContext} from 'react'
import PostsAPI from './api/PostsAPI'
import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const state = {
        postsAPI: PostsAPI(),

    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}