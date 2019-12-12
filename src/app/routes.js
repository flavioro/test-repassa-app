import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import React from "react"

// COMPONENTS VIEWS IMPORTS
import AdminPanel from "./views/admin/AdminPanel"
import UserLogin from "./views/users/UserLogin"
import UserPanel from "./views/users/UserPanel"

const api = {
    endpoint: 'https://repassa-api.herokuapp.com/api/',
    // endpoint: 'http://localhost:3030/api/',
}

const user =  {
    id: undefined,
    name: undefined,
    login: undefined,
    feedback: undefined,
}

export default class Routes extends React.Component
{
    constructor (props)
    {
        super(props)
        this.state = {
            apiEndpoint: api.endpoint,
            user: user
        }
        this.dataFlow = this.dataFlow.bind(this)
    }

    dataFlow = (data) => this.setState({ user: data })

    render = () =>
    {
        return (
            <Router>
                <Switch>
                    <Route exact path="/user" render={ () => <UserLogin data={ this.state } dataFlow={ this.dataFlow } /> } />
                    <Route path="/user/panel" render={ () => <UserPanel data={ this.state } /> } />
                    <Route path="/admin" render={ () => <AdminPanel endpoint={ this.state.apiEndpoint }/> } />
                    <Redirect from='*' to='/user' />
                </Switch>
            </Router>
        )
    }
}
