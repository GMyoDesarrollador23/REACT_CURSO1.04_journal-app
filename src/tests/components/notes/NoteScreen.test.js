import React from "react";
import { mount } from "enzyme";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";

import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import { activeNote } from "../../../actions/notes";
import { NoteScreen } from "../../../components/notes/NoteScreen";

// *****************************************************

jest.mock("../../../actions/notes", () => ({
   activeNote: jest.fn(),
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
         id: 1234,
         title: "hola",
         body: "Mundo",
         date: 0,
      },
      notes: [],
   },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wraper = mount(
   <Provider store={store}>
      <NoteScreen />
   </Provider>
);

// *****************************************************
describe("Pruebas en <NoteScreen/>", () => {
   // ---------------------------------------------
   test("debe de mostrarse correctamente", () => {
      expect(wraper).toMatchSnapshot();
   });

   // ---------------------------------------------
   test("debe de disparar el activeNote", () => {
      wraper
         .find('input[name="title"]')
         .simulate("change", {
            target: {
               name: "title",
               value: "texto de prueba",
            },
         });
      expect(activeNote).toHaveBeenLastCalledWith(1234, {
         title: "texto de prueba",
         body: "Mundo",
         id: 1234,
         date: 0,
      });
   });
   // ---------------------------------------------
});
