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
    apiSuffix: 'findbylogin/',
    loader: false,
    login: '',
    error: {
        notFound: {
            status: false,
            msg: 'Login incorreto ou inexistente'
        },
        empty: {
            status: false,
            msg: 'Preencha o login'
        }
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
        Axios.get(this.props.data.apiEndpoint + this.state.apiSuffix + this.state.login)
            .then(response =>
            {
                if (response.data.id) this.props.dataFlow(response.data)
            })
            .catch((err) =>
            {
                if (err.response.data.code === 404) this.setState(prevState => (
                    {
                        error: {
                            ...prevState.error,
                            notFound: {
                                ...prevState.error.notFound,
                                status: true
                            }
                        }
                    }
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
                error: {
                    ...prevState.error,
                    notFound: {
                        ...prevState.error.notFound,
                        status: false
                    },
                    empty: {
                        ...prevState.error.empty,
                        status: true
                    }
                },
                loader: false
            }))
        }
    }

    formField = (e) => 
    {
        if (this.state.error.empty.status || this.state.error.notFound.status) 
            this.setState(prevState => ({
                error: {
                    ...prevState.error,
                    notFound: {
                        ...prevState.error.notFound,
                        status: false
                    },
                    empty: {
                        ...prevState.error.empty,
                        status: false
                    }
                }
            }))
        
        this.setState({ login: e.target.value })
    }

    modalBuild = () =>
    {
        return (
            <React.Fragment>
                <div className='modal-body'>
                    <div className='field-group'>
                        <label>Área do funcionário</label>
                    </div>
                    <div className='field-group'>
                        <label>Login *</label>
                        <input
                            type='text'
                            name='login'
                            onChange={ (e) => this.formField(e) }
                            value={ this.state.login }
                        />
                    </div>
                    <div className='field-group'>
                        <span>{ this.state.error.notFound.status ? this.state.error.notFound.msg : this.state.error.empty.status ? this.state.error.empty.msg : '⠀' }</span>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button
                        disabled={ this.state.loader }
                        className='btn-light'
                        onClick={ () => this.submitForm() }
                    >
                        { this.state.loader ? <i className='fa fa-spinner fa-pulse'></i> : 'login' }
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
                <Modal display={ this.state.modalDisplay }>
                    { this.modalBuild() }
                </Modal>
        )
    }
}

export default withRouter(UserLogin)

UserLogin.propTypes = {
    dataFlow: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
