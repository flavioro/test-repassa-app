import React from 'react'

// Tools
import Axios from 'axios'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Style
import '../../assets/scss/LoginUser.scss'

// Components Childs
import Modal from '../../components/Modal'

const initState = {
    modalDisplay: true,
    loader: false,
    login: '',
    notFound: {
        status: false,
        msg: 'Login incorreto ou inexistente'
    },
    empty: {
        status: false,
        msg: 'Preencha o campo login'
    }
}

class UserLogin extends React.Component
{

    constructor (props)
    {
        super(props)
        this.state = {
            ...initState
        }
    }

    getUser = () =>
    {
        Axios.get(this.props.data.apiEndpoint + 'findbylogin/' + this.state.login)
            .then(response =>
            {
                if (response.data.id) this.props.dataFlow(response.data)
            })
            .catch((err) =>
            {
                if (err.response.data.code === 404) this.setState(prevState => (
                    { notFound: { ...prevState.notFound, status: true } }
                ))
            })
            .finally(() => { this.setState({ loader: false }) })
    }

    submitForm = () =>
    {
        if (this.state.login)
        {
            this.setState(prevState => ({
                notFound: { ...prevState.notFound, status: false },
                empty: { ...prevState.empty, status: false },
                loader: true
            }), () => { return this.state.login ? this.getUser() : false })
        } else
        {
            this.setState(prevState => ({
                notFound: { ...prevState.notFound, status: false },
                empty: { ...prevState.empty, status: true },
                loader: false
            }), () => { return false })
        }
    }

    formField = (e) => 
    {
        this.setState((prevState) => ({ empty: { ...prevState.empty, status: false } }))
        this.setState({ login: e.target.value })
    }

    modalBuild = () =>
    {
        return (
            <React.Fragment>
                <div className="modal-body form">
                    <div className="field-group">
                        <label>Área do funcionário</label>
                    </div>
                    <div className="field-group">
                        <label>Login *</label>
                        <input
                            type="text"
                            name="login"
                            onChange={ (e) => this.formField(e) }
                            value={ this.state.login }
                        />
                    </div>
                    <div className="field-group">
                        <span>{ this.state.notFound.status ? this.state.notFound.msg : this.state.empty.status ? this.state.empty.msg : '⠀' }</span>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-light large"
                        onClick={ () => this.submitForm() }
                    >
                        { this.state.loader ? <i className="fa fa-spinner fa-pulse"></i> : 'login' }
                    </button>
                </div>
            </React.Fragment>
        )
    }

    componentDidUpdate = () =>
    {
        if (this.props.data.user.id) this.props.history.push('/user/panel')
    }

    render = () =>
    {
        return (
            <div className="main">
                <Modal display={ this.state.modalDisplay }>
                    { this.modalBuild() }
                </Modal>
            </div>
        )
    }
}

export default withRouter(UserLogin)

UserLogin.propTypes = {
    dataFlow: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
