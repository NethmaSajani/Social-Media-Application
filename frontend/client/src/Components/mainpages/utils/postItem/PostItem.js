import React from 'react'
import BtnRender from './BtnRender'
import {Link} from 'react-router-dom'

//component for single post item
function PostItem({post, deletePost}) {
    return (
        <div>
            <Link to={`/detail/${post._id}`}>
            <div className="post_card">
            
            <Link to={`/detail/${post._id}`}>
            <div className="post_box">
                <h2 title={post.title}>{post.title}</h2>
                <p>{post.description}</p>
            </div>
            </Link>
            <BtnRender post={post} deletePost={deletePost} />
        </div>
            </Link>
        </div>
    )
}

export default PostItem
