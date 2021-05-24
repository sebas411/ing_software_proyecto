import React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from '../pages/HomePage'
import Registros from '../pages/Registros'

const Router = () => {

    return (<Switch>

        <Route exact path="/">
            <HomePage />
        </Route> 

        <Route exact path="/registros">
            <Registros />
        </Route>

    </Switch>)
}

export default Router