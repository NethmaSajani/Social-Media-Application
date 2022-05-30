const Posts = require('../Models/postModel')

// Filter, sorting and paginating
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const postCtrl = {

    //retrieve posts
    getPosts: async(req, res) =>{
        try {
            const features = new APIfeatures(Posts.find(), req.query)
            .filtering().sorting().paginating()

            const posts = await features.query

            res.json({
                status: 'success',
                result: posts.length,
                posts: posts
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //create post
    createPost: async(req, res) =>{
        try {
            const {post_id, title, description} = req.body;
            const post = await Posts.findOne({post_id})
            if(post)
                return res.status(400).json({msg: "This post already exists."})

            const newPost = new Posts({
                post_id, title: title.toLowerCase(), description
            })

            await newPost.save()
            res.json({msg: "Created a post"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //delete posts
    deletePost: async(req, res) =>{
        try {
            await Posts.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Post"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //update post
    updatePost: async(req, res) =>{
        try {
            const {title, description} = req.body;

            await Posts.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), description
            })

            res.json({msg: "Updated a Post"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = postCtrl