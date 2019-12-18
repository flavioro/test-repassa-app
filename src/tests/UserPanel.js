import React from 'react'
import ReactDOM from 'react-dom'
import UserPanel from '../app/views/users/PanelUser'

it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(<UserPanel />, div)
	ReactDOM.unmountComponentAtNode(div)
})
