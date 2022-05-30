import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import PostItem from '../utils/postItem/PostItem'
import axios from 'axios'
import Filters from './Filters'

function Posts() {
    const state = useContext(GlobalState)
    const [posts] = state.postsAPI.posts
    const [callback, setCallback] = state.postsAPI.callback

    const deletePost= async(id) => {
        try {
            const deletePost = axios.delete(`/api/posts/${id}`)
            await deletePost
            setCallback(!callback)
            alert('Deleted')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <>
        <Filters />

        <div className="posts">
            {
                posts.map(post => {
                    return <PostItem key={post._id} post={post}
                    deletePost={deletePost}/>
                })
            } 
        </div>
        </>
    )
}

export default Posts
