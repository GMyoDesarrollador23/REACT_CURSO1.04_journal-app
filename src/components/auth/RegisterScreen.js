import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import { useForm } from "../../hooks/useForm";
import { setError, removeError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
   const dispatch = useDispatch();

   const { msgError } = useSelector((state) => state.ui);

   const [FormValues, handleInputChange] = useForm({
      name: "Gerardo",
      email: "ddaalgo@algo.sds",
      password: "123456",
      password2: "123456",
   });

   const { name, email, password, password2 } = FormValues;

   const handleRegister = (e) => {
      e.preventDefault();
      if (isFromValid()) {
         dispatch(
            startRegisterWithEmailPasswordName(
               email,
               password,
               name
            )
         );
      }
   };

   const isFromValid = () => {
      if (name.trim().length === 0) {
         dispatch(setError("name is required"));
         return false;
      } else if (!validator.isEmail(email)) {
         dispatch(setError("email is not valid"));
         return false;
      } else if (
         password !== password2 ||
         password.length < 5
      ) {
         dispatch(
            setError(
               "Password should be at least 6 characters and match each other"
            )
         );
         return false;
      }

      dispatch(removeError());
      return true;
   };

   return (
      <>
         <h3 className="auth__title animate__animated animate__fadeIn animate__faster">
            Register
         </h3>
         <form
            onSubmit={handleRegister}
            className="animate__animated animate__fadeIn animate__faster"
         >
            {msgError && (
               <div className="auth__alert-error">
                  {msgError}
               </div>
            )}
            <input
               type="text"
               placeholder="Name"
               autoComplete="off"
               name="name"
               className="auth__input"
               onChange={handleInputChange}
               value={name}
            />

            <input
               type="email"
               placeholder="Email"
               name="email"
               autoComplete="off"
               className="auth__input"
               onChange={handleInputChange}
               value={email}
            />

            <input
               type="password"
               placeholder="Password"
               name="password"
               autoComplete="off"
               className="auth__input"
               onChange={handleInputChange}
               value={password}
            />

            <input
               type="password"
               placeholder="Confim Password"
               name="password2"
               className="auth__input"
               onChange={handleInputChange}
               value={password2}
            />

            <button
               type="submit"
               className="btn btn-primary btn-block mb-5"
               // disabled={true}
            >
               Register
            </button>
            <Link to="/auth/login" className="links">
               Already Register?
            </Link>
         </form>
      </>
   );
};
