import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../resources/images/logo.jpeg'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import ListItem from '@material-ui/core/ListItem';
import ButtonBase from '@material-ui/core/ButtonBase';


const useStyles = makeStyles((theme) => ({
    logo: {
        maxWidth: 360
    },
    appbar: {
        flexGrow: 1,
        backgroundColor: 'inherit'
    },
    buttonbar: {
        color: '#757575',
    },
    buttonActive: {
        color: theme.palette.primary.main
    },
    formControl: {
        minWidth: 120
    },
    selectcontainer: {
        padding: '0 0 10px'
    }
}))

const Navbar = () => {
    const classes = useStyles()
    const { push, location } = useHistory()

    return (<>
        <AppBar component={'nav'} position='static' className={classes.appbar}>
            <Toolbar>
                <Container>
                    <Grid container justify={'space-between'} alignItems={'center'} alignContent={'center'}>
                        <Grid item>
                            <ButtonBase onClick={() => push('/')}>
                                <img src={Logo} alt='logo' className={classes.logo} />
                            </ButtonBase>
                        </Grid>
                        <Grid item>
                            <Grid container direction='row' alignItems={'center'} alignContent={'center'}>
                                <Grid item>
                                    <ListItem button className={clsx({
                                        [classes.buttonbar]: true,
                                        [classes.buttonActive]: location.pathname === '/datos'
                                    })} onClick={() => push('/datos')}>Datos</ListItem>
                                </Grid>
                                <Grid item>
                                    <ListItem button className={clsx({
                                        [classes.buttonbar]: true,
                                        [classes.buttonActive]: location.pathname === '/registros'
                                    })} onClick={() => push('/registros')}>Registros</ListItem>
                                </Grid>
                                <Grid item>
                                    <ListItem button className={clsx({
                                        [classes.buttonbar]: true,
                                        [classes.buttonActive]: location.pathname === '/reportes'
                                    })} onClick={() => push('/reportes')}>Reportes</ListItem>
                                </Grid>
                                <Grid item>
                                    <ListItem button className={clsx({
                                        [classes.buttonbar]: true,
                                        [classes.buttonActive]: location.pathname === '/'
                                    })} onClick={() => push('/')}>Salir</ListItem>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    </>)
}

export default Navbar