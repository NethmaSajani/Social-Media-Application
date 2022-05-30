import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

//filter component
function Filters() {
    const state = useContext(GlobalState)
    //const [search, setSearch] = state.postAPI.search

    return (
        <div className="filter_menu">

             {/* search        */}
            <input type="text" placeholder="Search here..!"  />
            
        </div>
    )
}

export default Filters
