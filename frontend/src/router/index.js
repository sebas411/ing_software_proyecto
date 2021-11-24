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

        <Route exact path="/registros-G4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ">
            <Registros2 />
        </Route>

        <Route exact path="/datos-G4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ">
            <DataTable />
        </Route>

        <Route exact path="/reportes-G4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ">
            <Reportes />
        </Route>
        <Route exact path="/grafica-G4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ">
            <Chart />
        </Route>

    </Switch>)
}

export default Router