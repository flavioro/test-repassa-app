import React from 'react'

// dependencys
import Axios from 'axios'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'

// Styles
import '../../assets/icons/fontawesome/css/fontawesome.css'
import '../../assets/icons/fontawesome/css/solid.css'

// Components Childs
import Modal from '../../components/Modal'
import Table from '../../components/Table'
import Card from '../../components/Card'

const initState = {
    modalDisplay: false,
    loader: false,
    employeeList: [],
    form: {
        name: '',
        login: '',
        feedback: '',
    },
    duplicate: {
        status: false,
        msg: 'Login indisponível - Tente outro login'
    },
    empty: {
        status: false,
        msg: 'Preencha todos os campos'
    }
}

export default class AdminPanel extends React.Component
{

    /**
     * @param {Object} props
     */
    constructor (props)
    {
        super(props)
        this.state = {
            ...initState
        }
    }

    apiPost = () =>
    {
        Axios.post(this.props.endpoint + 'create', null, { params: { ...this.state.form } })
            .then(() =>
            {
                this.modalClose()
                this.employeeListReset()
            })
            .catch((err) =>
            {
                if (err.response.data.code === 11000) this.setState(prevState => (
                    {
                        duplicate: { ...prevState.duplicate, status: true }
                    }
                ))
            })
            .finally(() => { this.setState({ loader: false }) })
    }

    apiGet = async () =>
    {
        await this.setState({ loader: true })
        Axios.get(this.props.endpoint + 'list')
            .then(response =>
            {
                response.data.map(data =>
                {
                    const employee = {
                        name: data.name,
                        login: data.login,
                        feedback: data.feedback,
                        id: data._id
                    }

                    return ( this.setState(prevState => ( { employeeList: [...prevState.employeeList, employee] } ))
                    )
                })
            })
            .finally(() => { this.setState({ loader: false })})
    }

    apiPut = () =>
    {
        let user = { ...this.state.form }
        // @ts-ignore
        delete user.id
        Axios.put(this.props.endpoint + this.state.form.id, null, { params: { ...user } })
            .then(() =>
            {
                this.modalClose()
                this.employeeListReset()
            })
            .catch((err) =>
            {
                if (err.response.data.code === 11000) this.setState(prevState => (
                    {
                        duplicate: { ...prevState.duplicate, status: true }
                    }
                ))
            })
            .finally(() => { this.setState({ loader: false }) })
    }

    /**
     * @param {React.ReactText} id
     */
    apiDelete = (id) =>
    {
        Axios.delete(this.props.endpoint + id)
            .then((response) => this.employeeListReset())
    }

    modalToggle = () => this.setState({ modalDisplay: !this.state.modalDisplay })

    cardHeader = () =>
    {
        return (
            <React.Fragment>
                <h2>Lista de funcionários</h2>
                <button
                    className="btn btn-add"
                    onClick={ () => this.modalToggle() }
                >
                    <i className="fa fa-plus"></i>
                </button>
            </React.Fragment>
        )
    }

    cardEmpty = () => 
    {
        return (
            <React.Fragment>
                <div>
                    <h3>Nenhum funcionário cadastrado!</h3>
                    <span>Clique no botão <b>+</b> para cadastrar um novo funcionário<b>.</b></span>
                </div>
                <div className="emoji">
                    <i className="fas fa-grimace" />
                </div>
            </React.Fragment>
        )
    }

    tableRows = () =>
    {   
        const itens = this.state.loader ? [1, 2, 3, 4, 5, 6, 7] : this.state.employeeList
        return itens.map((item, index) =>
        {
            return (
                <tr key={ index }>
                    <td className="left">{ this.state.loader ? <Skeleton /> : item.name }</td>
                    <td>{ this.state.loader ? <Skeleton /> : item.login }</td>
                    <td>{ this.state.loader ? <Skeleton /> : item.id }</td>
                    <td className="actions">
                        <button
                            className="btn btn-edit"
                            onClick={ () => this.btnEdit(item.id) }
                        >
                            <i className="fa fa-pen"></i>
                        </button>
                        <button
                            className="btn btn-dele"
                            onClick={ () => this.apiDelete(item.id) }
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    tableBuild = () =>
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th className="left">Nome</th>
                        <th>login</th>
                        <th>ID</th>
                        <th className="actions">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    { this.tableRows() }
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total de funcionários</td>
                        <td></td>
                        <td></td>
                        <td className="center">{ this.state.employeeList.length }</td>
                    </tr>
                </tfoot>
            </table>

        )
    }

    /**
     * @param {String} id
     */
    btnEdit = (id) =>
    {
        const data = this.state.employeeList.find(user => { return user.id === id })
        this.setState({ form: data })
        this.modalToggle()
    }

    employeeListReset = () => this.setState({ employeeList: [] }, () => { this.apiGet() })

    /**
     * @param {{ target: { name: React.ReactText; value: String } }} event
     */
    formField = (event) => 
    {
        const form = this.state.form
        form[event.target.name] = event.target.value
        this.setState({ form: form })
    }

    formReset = () => 
    {
        this.setState(prevState => (
            {
                duplicate: { ...prevState.duplicate, status: false },
                empty: { ...prevState.empty, status: false },
                form: {
                    name: '',
                    login: '',
                    feedback: '',
                }
            }
        ))
    }

    modalClose = () => 
    {
        this.formReset()
        this.modalToggle()
    }

    modalSave = async () =>
    {
        await this.setState(prevState => (
            {
                duplicate: { ...prevState.duplicate, status: false },
                empty: { ...prevState.empty, status: false },
                loader: true
            }
        ))
        if (this.state.form.name && this.state.form.login) this.state.form.id ? this.apiPut() : this.apiPost()
        else this.setState(prevState => ({
            empty: { ...prevState.empty, status: true },
            loader: false
        }))
    }

    modalBuild = () =>
    {
        return (
            <React.Fragment>
                <div className="modal-body form">
                    <div className="field-group">
                        <label>Cadastro de funcionário</label>
                    </div>
                    <div className="field-group">
                        <label>Nome *</label>
                        <input
                            type="text"
                            name="name"
                            onChange={ (e) => this.formField(e) }
                            value={ this.state.form.name }
                        />
                    </div>
                    <div className="field-group">
                        <label>Login *</label>
                        <input
                            type="text"
                            name="login"
                            onChange={ (e) => this.formField(e) }
                            value={ this.state.form.login }
                        />
                    </div>
                    <div className="field-group">
                        <label>Feedback</label>
                        <textarea
                            rows={ 7 }
                            name="feedback"
                            onChange={ (e) => this.formField(e) }
                            value={ this.state.form.feedback }
                        />
                    </div>
                    <div className="field-group">
                        <span>{ this.state.duplicate.status ? this.state.duplicate.msg : this.state.empty.status ? this.state.empty.msg : '⠀' }</span>
                        <i className={ this.state.loader ? "fa fa-spinner fa-pulse" : 'd-none'}></i>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-primary"
                        onClick={ () => this.modalSave() }
                    >
                        salvar
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={ () => this.modalClose() }
                    >
                        cancelar
                    </button>
                </div>
            </React.Fragment>
        )
    }

    componentDidMount = () => this.apiGet()

    render = () =>
    {
        return (
            <div className="main">
                <Card header={ this.cardHeader() } >
                    <Table>
                        { this.state.employeeList.length || this.state.loader ? this.tableBuild() : this.cardEmpty() }
                    </Table>
                </Card>
                <Modal display={ this.state.modalDisplay }>
                    { this.modalBuild() }
                </Modal>
            </div>
        )
    }
}

AdminPanel.propTypes = {
    endpoint: PropTypes.string.isRequired
}
