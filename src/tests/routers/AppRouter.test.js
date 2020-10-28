import React from "react";
import { mount } from "enzyme";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import { act } from "react-dom/test-utils";
import { login } from "../../actions/auth";
import { AppRouter } from "../../routers/AppRouter";
import { firebase } from "../../firebase/firebase-config";
// *****************************************************

jest.mock("../../actions/auth", () => ({
   login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
   auth: {},
   ui: {
      loading: false,
      msgError: null,
   },
   notes: {
      active: {
         id: "active",
      },
      notes: [],
   },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

// ********************************************************
describe("Prubas en el appRouter", () => {
   // -----------------------------------------------------

   // -----------------------------------------------------
   test("debe de llamar al login si esta aunteficado", async () => {
      let user;
      await act(async () => {
         const userCred = await firebase
            .auth()
            .signInWithEmailAndPassword(
               "test@testing.com",
               "123456"
            );
         user = userCred.user;
         console.log(user);
         const wraper = mount(
            <Provider store={store}>
               <MemoryRouter>
                  <AppRouter />
               </MemoryRouter>
            </Provider>
         );
      });

      expect(login).toHaveBeenCalledWith(
         "8ipHPby7oANYLGjvIv6qMMwz2T32",
         null
      );
   });
   // -----------------------------------------------------
});
