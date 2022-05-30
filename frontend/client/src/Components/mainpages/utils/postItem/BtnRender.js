import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

//logic for buttons
function BtnRender({post, deletePost}) {
    const state = useContext(GlobalState)

    return (

        <div className="row_btn">

            {/* Link for Delete Button */}
            <Link id="btn_delete" to="#!"
                onClick={() => deletePost(post._id)}>
                Delete
            </Link>

            {/* Link for Edit Button */}
            <Link id="btn_edit" to={`/edit_post/${post._id}`}>
                Edit
            </Link>

        </div>
    )
}

export default BtnRender
