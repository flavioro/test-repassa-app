import React from 'react'

// Tools
import { BrowserRouter } from "react-router-dom"

// Components Childs
import Header from './components/Header'
import Routes from './Routes'

const api = {
    endpoint: 'https://repassa-api.herokuapp.com/api/',
    // endpoint: 'http://localhost:3030/api/',
}

const user = {
    id: undefined,
    name: undefined,
    login: undefined,
    feedback: undefined,
}

export default class App extends React.Component 
{

    constructor (props)
    {
        super(props)
        this.state = {
            apiEndpoint: api.endpoint,
            user
        }
        this.dataFlow = this.dataFlow.bind(this)
    }

    dataFlow = (data) => this.setState({ user: data })

    render = () =>
    {
        return (
            <BrowserRouter>
                <div className="main">
                    <Header />
                    <Routes data={ this.state } dataFlow={ this.dataFlow } />
                </div>
            </BrowserRouter>
        )
    }
}

