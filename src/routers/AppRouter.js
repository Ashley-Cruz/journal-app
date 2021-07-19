import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from './../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actios/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from './../actios/notes';

export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async(user) => {
            if(user?.uid){ //Si el objeto user tiene algo, entonces pregunta si existe el uid, si no existe (es null) entonces se sale de la condición
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                
                dispatch(startLoadingNotes(user.uid))
            }else{
                setIsLoggedIn(false)
            }
            setChecking(false); //Ya terminé el chequeo
        })
        
    }, [dispatch, setChecking, setIsLoggedIn])

    if(checking){
        return(
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" isAuthenticated={isLoggedIn} component={AuthRouter} />
                    {/* <Route path="/auth" component={AuthRouter} /> */}
                    <PrivateRoute exact path="/" isAuthenticated={isLoggedIn} component={JournalScreen} />
                    {/* <Route exact path="/" component={JournalScreen} /> */}
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
