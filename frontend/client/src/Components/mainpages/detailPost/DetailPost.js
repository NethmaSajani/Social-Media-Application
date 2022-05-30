import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import PostItem from '../utils/postItem/PostItem'

//single view of a post
function DetailPost() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [posts] = state.postsAPI.posts
    const [detailPost, setDetailPost] = useState([])

    useEffect(() =>{
        if(params.id){

            posts.forEach(post => {
                if(post._id === params.id) setDetailPost(post)
            })
        }
    },[params.id, posts])

    if(detailPost.length === 0) return null;

    return (
        <>
            <div className="detail">
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailPost.title}</h2>
                    </div>
                    <p style={{"fontSize": "14px"}}>Published At {detailPost.createdAt}</p>
                    <p>{detailPost.description}</p>
                    <p>{detailPost.content}</p>
                    <form>
                        <input type="text" style={{width: "6cm"}} placeholder='Add comments'/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DetailPost
