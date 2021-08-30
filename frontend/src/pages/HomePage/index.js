
import React, { useState } from 'react'

import "./style.css"

import { useHistory } from 'react-router-dom'
import axios from 'axios'


//Aquí iria el login

const HomePage = () => {
    const [state, setState] = useState({ username: '', password: '' })
    //const { push } = useHistory()

    const apiURL= 'http://127.0.0.1:8000/transactions/';
    const handleLogin =async  () => {
        try {
            await axios.post(apiURL+'/login/', state)
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
        
            <div className="login-wrapper">
                <h1>Textiles La Roca S.A.</h1>
                <label>
                    <p>Usuario</p>
                    <input type="text" name="username" placeholder ="Ingresa tu usuario" />
                </label>
                <label>
                    <p >Contraseña</p>
                    <input type="password" name="password" placeholder ="Ingresa tu contraseña" />
                </label>
                    <button onClick={() => push('./registros')}>Ingresar</button>
                     
            </div>
        
    );
}

export default HomePage