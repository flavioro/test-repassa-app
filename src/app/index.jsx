import React from 'react'

// Styles
import './assets/scss/Main.scss'

// Components Childs
import Header from './components/Header'
import Routes from './routes'

export default function App (props)
{
    return (
        <div className="main">
            <Header />
            <Routes />
        </div>
    )
}
