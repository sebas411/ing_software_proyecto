import React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from '../pages/HomePage'
import Registros2 from '../pages/Registros2'
import DataTable from '../pages/Datos'
import Reportes from '../pages/Reportes'
import Chart from '../pages/Chart'

const Router = () => {

    return (<Switch>

        <Route exact path="/">
            <HomePage />
        </Route> 

        <Route exact path="/registros">
            <Registros2 />
        </Route>

        <Route exact path="/datos">
            <DataTable />
        </Route>

        <Route exact path="/reportes">
            <Reportes />
        </Route>
        <Route exact path="/grafica">
            <Chart />
        </Route>

    </Switch>)
}

export default Router