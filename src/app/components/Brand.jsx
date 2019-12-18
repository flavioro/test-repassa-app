import React from 'react'

// Tools
import { Link } from 'react-router-dom'

// Style
import '../assets/scss/_Brand.scss'

export default props =>
(
    <aside className='brand'>
        <Link to='/'>
            <b>Feed</b>back<i>.</i>app
        </Link>
    </aside>
)

