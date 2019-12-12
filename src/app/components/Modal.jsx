import React from 'react';

// Tools
import PropTypes from 'prop-types'

// Style
import '../assets/scss/Modal.scss';

// Components Childs
import Logo from './Brand';

const Modal = props => (
    <div className={props.display ? "modal" : "d-none"}>
        <div className="modal-main">
            <div className="modal-head">
                <Logo />
                <span>campos marcados com * são obrigatórios</span>
            </div>
            {props.children}
        </div>
    </div>
)

export default Modal

Modal.propTypes = {
    display: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}
