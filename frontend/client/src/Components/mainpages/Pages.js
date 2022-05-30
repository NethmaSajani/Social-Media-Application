import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Posts from './posts/Posts'
import DetailPost from './detailPost/DetailPost'
import NotFound from './utils/not_found/NotFound'
import CreatePost from './createPost/CreatePost'
import {GlobalState} from '../../GlobalState'

//link frontend routes
function Pages() {
    const state = useContext(GlobalState)


    return (
        <Switch>

            <Route path="/" exact component={Posts} />

            <Route path="/post" exact component={Posts} />
            <Route path="/detail/:id" exact component={DetailPost} />

            <Route path="/create_post" exact component={CreatePost} />
            <Route path="/edit_post/:id" exact component={CreatePost} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
