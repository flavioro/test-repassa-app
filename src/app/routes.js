import React from "react"

// Tools
import { Route, Switch, Redirect } from "react-router-dom"
import PropTypes from 'prop-types'

// COMPONENTS VIEWS IMPORTS
import AdminPanel from "./views/admin/AdminPanel"
import UserLogin from "./views/users/UserLogin"
import UserPanel from "./views/users/UserPanel"

const Routes = (props) =>
    <Switch>
        <Route exact path="/user" render={ () => <UserLogin data={ props.data } dataFlow={ props.dataFlow } /> } />
        <Route path="/user/panel" render={ () => <UserPanel data={ props.data } /> } />
        <Route path="/admin" render={ () => <AdminPanel endpoint={ props.data.apiEndpoint }/> } />
        <Redirect from='*' to='/user' />
    </Switch>

export default Routes

Routes.propTypes = {
    dataFlow: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
