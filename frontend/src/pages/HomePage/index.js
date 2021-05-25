import { Container } from '@material-ui/core';
import React from 'react'
import Grid from '@material-ui/core/Grid';
import "./style.css"
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'


//Aquí iria el login

const HomePage = () => {

    const { push } = useHistory()

    return (

        <Container>
            
            <div className="login-wrapper">
                <h1>BIENVENIDOS</h1>
            
            <label>
                <p>Usuario</p>
                <input type="text" />
            </label>
            <label>
                <p>Contraseña</p>
                <input type="password" />
            </label>
            
            <Button variant='Ingresar' onClick={() => push('registros')}>
            Ingresar
            </Button>
            
            </div>   
       </Container>
    );
}

export default HomePage