const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')

//post routes
router.route('/posts')
    .get(postCtrl.getPosts)
    .post(postCtrl.createPost)


router.route('/posts/:id')
    .delete(postCtrl.deletePost)
    .put(postCtrl.updatePost)

module.exports = router