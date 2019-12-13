import React from 'react'
import { withRouter } from 'react-router-dom'

// Tools
import PropTypes from 'prop-types'

// Styles
import '../../assets/icons/fontawesome/css/fontawesome.css'
import '../../assets/icons/fontawesome/css/solid.css'

// Components Childs
import Card from '../../components/Card'

class UserPanel extends React.Component
{

    cardHeader = () =>
    {
        return (
            <React.Fragment>
                <h2>Olá { this.props.data.user.name }!</h2>
                <button
                    className="btn btn-add"
                    onClick={ () => document.location.href = '/' }
                >
                    <i className="fa fa-sign-out-alt"></i>
                </button>
            </React.Fragment>
        )
    }

    feedbackRender = () => 
    {
        return (
            <React.Fragment>
                <div>
                    <h3>Seu feedback:</h3>
                    <p> { this.props.data.user.feedback }</p>
                </div>
            </React.Fragment>
        )
    }

    feedbackEmpty = () => 
    {
        return (
            <React.Fragment>
                <div>
                    <h3>Sem feedback ainda!</h3>
                    <p>Você ainda não recebeu nenhum feedback do seu gestor.</p>
                </div>
                <div className="emoji">
                    <i className="fa fa-meh-rolling-eyes" />
                </div>
            </React.Fragment>
        )
    }

    componentDidMount = () =>
    {
        console.log('didmount')
        console.log(this.props.history)
        console.log('id-user' + this.props.data.user.id)
        if (!this.props.data.user.id) this.props.history.push('/user')
    }
    
    render = () =>
    {
        console.log('render')
        return (
            <div className="main">
                <Card header={ this.cardHeader() } >
                    { this.props.data.user.feedback ? this.feedbackRender() : this.feedbackEmpty() }
                </Card>
            </div>
        )
    }
}

export default withRouter(UserPanel)


UserPanel.propTypes = {
    data: PropTypes.object.isRequired
}
