import Swal from "sweetalert2";

import { types } from "../types/types";
import {
   firebase,
   googleAuthProvider,
} from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";

import { notesLogout } from "../actions/notes";

export const startLoginEmailPassword = (
   email,
   password
) => {
   return (dispatch) => {
      dispatch(startLoading());
      return firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(({ user }) => {
            dispatch(login(user.uid, user.displayName));

            dispatch(finishLoading());
            Swal.fire({
               position: "center",
               icon: "success",
               title: `welcome back "${user.displayName}"`,
               showConfirmButton: false,
               timer: 2000,
            });
         })
         .catch((e) => {
            console.warn(e);
            dispatch(finishLoading());
            Swal.fire({
               position: "center",
               icon: "error",
               title: e.message,
               showConfirmButton: false,
               timer: 2000,
            });
         });
   };
};

export const startRegisterWithEmailPasswordName = (
   email,
   password,
   name
) => {
   return (dispatch) => {
      firebase
         .auth()
         .createUserWithEmailAndPassword(email, password)
         .then(async ({ user }) => {
            await user.updateProfile({
               displayName: name,
            });
            // console.log(user);

            dispatch(login(user.uid, user.displayName));
         })
         .catch((e) => {
            console.log(e);
            Swal.fire({
               position: "center",
               icon: "error",
               title: e.message,
               showConfirmButton: false,
               timer: 2000,
            });
         });
   };
};

export const startGoogleLogin = () => {
   return (dispatch) => {
      firebase
         .auth()
         .signInWithPopup(googleAuthProvider)
         .then(({ user }) => {
            dispatch(login(user.uid, user.displayName));
         });
   };
};

export const startLogoud = () => {
   return async (dispatch) => {
      await firebase.auth().signOut();

      dispatch(logout());
      dispatch(notesLogout());
   };
};

export const login = (uid, displayName) => ({
   type: types.login,
   payload: {
      uid,
      displayName,
   },
});

export const logout = () => ({
   type: types.logout,
});
