import React from "react";
import { mount } from "enzyme";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import { LoginScreen } from "../../components/auth/LoginScreen";
import {
   startGoogleLogin,
   startLoginEmailPassword,
} from "../../actions/auth";
// *****************************************************

jest.mock("../../actions/auth", () => ({
   startGoogleLogin: jest.fn(),
   startLoginEmailPassword: jest.fn(),
}));

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
store.dispatch = jest.fn();

const wraper = mount(
   <Provider store={store}>
      <MemoryRouter>
         <LoginScreen />
      </MemoryRouter>
   </Provider>
);
// *****************************************************

describe("Pruebas en <LognScreen/>", () => {
   // -------------------------------------------------

   beforeEach(() => {
      store = mockStore(initState);
      jest.clearAllMocks();
   });

   // -------------------------------------------------
   test("debe de mostrarse correctamente", () => {
      expect(wraper).toMatchSnapshot();
   });
   // -------------------------------------------------
   test("debe de dispara la accion de autentificacion de google", () => {
      wraper.find(".google-btn").prop("onClick")();
      expect(startGoogleLogin).toHaveBeenCalled();
   });

   // -------------------------------------------------
   test("debe de diparar el start login conargumentes", () => {
      wraper.find("form").prop("onSubmit")({
         preventDefault() {},
      });
      expect(startLoginEmailPassword).toHaveBeenCalledWith(
         "ddaalgo@algo.sds",
         "123456"
      );
   });
});
