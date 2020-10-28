import React from "react";
import { mount } from "enzyme";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";

import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import { startLogoud } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";
import { Sidebar } from "../../../components/journal/Sidebar";
// *****************************************************

jest.mock("../../../actions/auth", () => ({
   startLogoud: jest.fn(),
}));
jest.mock("../../../actions/notes", () => ({
   startNewNote: jest.fn(),
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
      notes: [],
   },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wraper = mount(
   <Provider store={store}>
      <Sidebar />
   </Provider>
);

// *****************************************************
describe("Prueba en <Sidebar/>", () => {
   // ----------------------------------------
   beforeEach(() => {
      store = mockStore(initState);
      jest.clearAllMocks();
   });

   // ----------------------------------------
   test("debe de mostrarse correctamente", () => {
      expect(wraper).toMatchSnapshot();
   });

   // ----------------------------------------
   test("debe de llamar la accion del startLogout", () => {
      wraper.find("button").prop("onClick")();
      expect(startLogoud).toHaveBeenCalled();
   });

   // ----------------------------------------
   test("debe de llamar el startNewnote", () => {
      wraper.find(".journal__new-entry").prop("onClick")();
      expect(startNewNote).toHaveBeenCalled();
   });
   // ----------------------------------------
});
