import React from 'react'

// Tools
import PropTypes from 'prop-types'

// Style
import '../assets/scss/_Table.scss'

export default function Table (props)
{
    return (
        <React.Fragment>
            { props.children }
        </React.Fragment>
    )
}

Table.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}
