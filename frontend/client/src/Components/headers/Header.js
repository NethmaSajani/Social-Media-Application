import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

//header component
function Header() {
    const state = useContext(GlobalState)
    const [menu, setMenu] = useState(false)

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                <a href={"/post"}><span>Posts</span></a>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to="/post">Posts</Link></li>

                <li><Link to="/create_post">Create Post</Link></li>

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>
        </header>
    )
}

export default Header
