import {useState, useEffect} from 'react'
import axios from 'axios'

//Posts API
function PostsAPI() {
    const [posts, setPosts] = useState([])
    const [callback, setCallback] = useState(false)
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getPosts = async () => {
            const res = await axios.get(`/api/posts?limit=${page*9}}&${sort}&title[regex]=${search}`)
            setPosts(res.data.posts)
            setResult(res.data.result)
        }
        getPosts()
    },[callback, sort, search, page])
    
    return {
        posts: [posts, setPosts],
        callback: [callback, setCallback],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default PostsAPI
