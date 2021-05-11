import React from 'react'
import { Route, Switch } from 'react-router'
//import HomePage from '../pages/Home'
import Registros from '../pages/Registros'

const Router = () => {

           /* <Route path="/Homepage">
            <HomePage />
        </Route> */

    return (<Switch>
        <Route path="/">
            <Registros />
        </Route>
    </Switch>)
}

export default Router