import React, { useEffect, useState } from "react";
import {
   BrowserRouter as Router,
   Switch,
   Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import { firebase } from "../firebase/firebase-config";
import { AuthRouter } from "./AuthRouter";
import { JornalScreen } from "../components/journal/JornalScreen";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
   const dispatch = useDispatch();

   const [cheking, setCheking] = useState(true);

   const [isLoggeIn, setIsLoggeIn] = useState(false);

   useEffect(() => {
      firebase.auth().onAuthStateChanged(async (user) => {
         if (user?.uid) {
            dispatch(login(user.uid, user.displayName));
            setIsLoggeIn(true);

            dispatch(startLoadingNotes(user.uid));
         } else {
            setIsLoggeIn(false);
         }
         setCheking(false);
      });
   }, [dispatch, setCheking, setIsLoggeIn]);

   if (cheking) {
      return <h1>Espera...</h1>;
   }
   return (
      <Router>
         <div>
            <Switch>
               <PublicRoute
                  path="/auth"
                  component={AuthRouter}
                  isAuthenticated={isLoggeIn}
               />

               <PrivateRoute
                  exact
                  isAuthenticated={isLoggeIn}
                  path="/"
                  component={JornalScreen}
               />
               <Redirect to="/auth/login" />
            </Switch>
         </div>
      </Router>
   );
};
