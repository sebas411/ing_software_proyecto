import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import "./style.css"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SpaceBox from '../../components/SpaceBox';
import { useHistory } from 'react-router-dom'
//import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Logo from '../../resources/images/logo.jpeg'


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        //backgroundColor: theme.palette.primary.main
    },
    logo: {
        maxWidth: 460
    },
    textf: {
        width: 600
    },
    title: {
        color: theme.palette.primary.dark
    },
    root1: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.primary.dark,
        padding: '100px',
        margin: '0px',
        display: 'flex'
    }
}))


const HomePage = () => {
    const classes = useStyles()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    /*
    const [state, setState] = useState({ username: '', password: '' })

    const apiURL = 'http://127.0.0.1:8000/transactions/';
    const handleLogin = async () => {
        try {
            await axios.post(apiURL + '/login/', state)
            console.log('login successfully')
        } catch (err) {
            console.log('login failed')
        }
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }*/

    const handleUser = (event) => {
        setUser(event.target.value)
        console.log(user)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
        console.log(password)
    }

    const { push } = useHistory()

    const hanldeLogin = () => {
        if (user==='admin' && password==='admin') {
        push('./registros-G4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ')}
        else{
            return false;
        }
        
    }


    return (

        <Grid container direction='column' justify={'center'} alignItems={'center'} alignContent={'center'} className={classes.root1}>
            <SpaceBox top={24}>
                <Grid item xs={8} sm={12}>
            <Card className={classes.root}>
                <CardContent>
                    <Grid container direction='column' justify={'center'} alignItems={'center'} alignContent={'center'}>
                    <Grid item xs={6} sm={12}>
                        <SpaceBox top={6}>
                        <Typography> <img src={Logo} alt='logo' className={classes.logo} /></Typography>
                        </SpaceBox>
                    </Grid>
                    <Grid item xs={6} sm={12}>
                    <SpaceBox top={6}>
                    <TextField label="Usuario" variant="standard" onChange={handleUser} className={classes.textf}/>
                    </SpaceBox>
                    </Grid>
                    <Grid item xs={6} sm={12}>
                    <SpaceBox top={6}>
                    <TextField label="Contraseña" variant="standard" hintText='Password' type='password' onChange={handlePassword} className={classes.textf}/>
                    </SpaceBox>
                    </Grid>
                    <Grid item xs={6} sm={12}>
                    <SpaceBox top={6}>
                    <Button variant='contained' onClick={hanldeLogin} color='primary'>
                                Ingresar
                        </Button>
                    </SpaceBox>
                    </Grid>
                    </Grid>
                </CardContent>
            </ Card>
            </Grid>
            </SpaceBox>

        </Grid>

    );
}

export default HomePage