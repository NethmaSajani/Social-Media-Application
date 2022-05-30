import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    post_id: '',
    title: '',
    description: '',
    _id: ''
}

function CreatePost() {
    const state = useContext(GlobalState)
    const [post, setPost] = useState(initialState)
    const history = useHistory()
    const param = useParams()

    const [posts] = state.postsAPI.posts
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.postsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            posts.forEach(post => {
                if(post._id === param.id) {
                    setPost(post)
                }
            })
        }else{
            setOnEdit(false)
            setPost(initialState)
        }
    }, [param.id, posts])

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setPost({...post, [name]:value})
    }

    const handleChangeColor = e => {
        post.title = {color: "black"}
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                await axios.put(`/api/posts/${post._id}`, {...post})
            }else{
                await axios.post('/api/posts', {...post})
            }
            setCallback(!callback)
            history.push("/post")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="create_post">

            <form onSubmit={handleSubmit} id="createpostform">

                {/* input for post id */}
                <div className="row">
                    <label htmlFor="post_id">Post ID</label>
                    <input type="text" name="post_id" id="post_id" required
                    value={post.post_id} onChange={handleChangeInput} disabled={onEdit} placeholder="Post ID"/>
                </div>

                {/* input for post title */}
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={post.title} onChange={handleChangeInput} placeholder="Title"/>
                </div>

                {/* input for post description */}
                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={post.description} rows="5" onChange={handleChangeInput} style={{borderColor: "rgb(212, 212, 219)"}} />
                </div>

                <div>
                    <label htmlFor='color'> Select Color</label>
                    <div>
                        <button onClick={handleChangeColor} style={{ "backgroundColor": "red", "width": "2cm", "height": "2cm" }}></button>
                        <button onClick={handleChangeColor} style={{ "backgroundColor": "blue", "width": "2cm", "height": "2cm" }}></button>
                        <button onClick={handleChangeColor} style={{ "backgroundColor": "green", "width": "2cm", "height": "2cm" }}></button>
                    </div>
                </div>

                {/* buttons */}
                <button type="reset" id="btnreset">RESET</button>
                <button type="submit" id="btncreate">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreatePost
