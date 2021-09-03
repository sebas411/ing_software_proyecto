import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    logo: {
        maxWidth: 160,
    },
    appbar: {
        flexGrow: 1,
        backgroundColor: 'primary'
    }
}))

const Navbar = () => {
    const classes = useStyles()
    const { push } = useHistory()

    return (<>
            <AppBar position='static' className={classes.appbar}>
            <Toolbar>
                <Container>
                    <Grid container justify={'center'} alignItems={'center'} spacing={8}>
                        <Grid item>
                            <Button variant='contained' onClick={() => push('./datos')} color='primary'>
                                Datos
                        </Button>
                        </Grid>
                        <Grid item>
                        <Button variant='contained' onClick={() => push('./registros')} color='primary'>
                                Registros
                        </Button>
                        </Grid>
                        <Grid item>
                        <Button variant='contained' onClick={() => push('./reportes')} color='primary'>
                                Reportes
                        </Button>
                        </Grid>
                        <Grid item>
                        <Button variant='contained' onClick={() => push('./')} color='primary'>
                                Salir
                        </Button>
                        </Grid>
                    </Grid>

                </Container>
            </Toolbar>
        </AppBar>

    </>)
}

export default Navbar