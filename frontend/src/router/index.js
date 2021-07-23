import React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from '../pages/HomePage'
import Registros from '../pages/Registros'
import DataTable from '../pages/Datos'
import Reportes from '../pages/Reportes'

const Router = () => {

    return (<Switch>

        <Route exact path="/">
            <HomePage />
        </Route> 

        <Route exact path="/registros">
            <Registros />
        </Route>

        <Route exact path="/datos">
            <DataTable />
        </Route>

        <Route exact path="/reportes">
            <Reportes />
        </Route>

    </Switch>)
}

export default Router