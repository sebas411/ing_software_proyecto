import { Container } from '@material-ui/core';
import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import "./style.css"
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'
import axios from 'axios'


//Aquí iria el login

const HomePage = () => {
    const [state, setState] = useState({ username: '', password: '' })
    //const { push } = useHistory()

    const handleLogin =async  () => {
        try {
            await axios.post('/login', state)
            console.log('login successfully')
        } catch(err) {
            console.log('login failed')
        }
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const { push } = useHistory()

    return (
        <Container>
            <div className="login-wrapper">
                <h1>Textiles La Roca S.A.</h1>
                <label>
                    <p>Usuario</p>
                    <input type="text" name="username" value={state.username} onChange={handleChange} />
                </label>
                <label>
                    <p>Contraseña</p>
                    <input type="password" name="password" value={state.password} onChange={handleChange} />
                </label>
                    <Button variant='Ingresar' onClick={() => push('./registros')} >
                     Ingresar
                     </Button>
            </div>
        </Container>
    );
}

export default HomePage