import React from "react";
import { mount } from "enzyme";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import { RegisterScreen } from "../../components/auth/RegisterScreen";

// *****************************************************************
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
   auth: {},
   ui: {
      loading: false,
      msgError: null,
   },
};

let store = mockStore(initState);

const wraper = mount(
   <Provider store={store}>
      <MemoryRouter>
         <RegisterScreen />
      </MemoryRouter>
   </Provider>
);
// *****************************************************************
describe("Pruebas en el <RegisterScreen/>", () => {
   // ----------------------------------------------------------

   beforeEach(() => {
      store = mockStore(initState);
      jest.clearAllMocks();
   });

   // ----------------------------------------------------------
   test("debe de mostrarse correctamente", () => {
      expect(wraper).toMatchSnapshot();
   });

   // ----------------------------------------------------------
   test("debe de hacer el dipatch de la accion respectiva", () => {
      const emailField = wraper.find('input[name="email"]');

      emailField.simulate("change", {
         target: {
            value: "",
            name: "email",
         },
      });

      wraper.find("form").simulate("submit", {
         preventDefault() {},
      });
      const actions = store.getActions();
      expect(actions).toEqual([]);
   });

   // ----------------------------------------------------------
   test("debe de mostrar la caja de alerta con el error", () => {
      const initState = {
         auth: {},
         ui: {
            loading: false,
            msgError: "email no es correcto",
         },
      };

      const store = mockStore(initState);

      const wraper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <RegisterScreen />
            </MemoryRouter>
         </Provider>
      );

      expect(
         wraper.find(".auth__alert-error").exists()
      ).toBe(true);

      expect(
         wraper.find(".auth__alert-error").text().trim()
      ).toBe(initState.ui.msgError);
   });
   // ----------------------------------------------------------
});
