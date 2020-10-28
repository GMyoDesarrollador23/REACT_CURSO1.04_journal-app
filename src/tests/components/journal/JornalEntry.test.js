import React from "react";
import { mount } from "enzyme";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";

import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import { activeNote } from "../../../actions/notes";
import { JornalEntry } from "../../../components/journal/JornalEntry";

// *****************************************************

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
   id: 123,
   date: 0,
   title: "hola",
   body: "Mundo",
   url: "https://hola/mundo.jpg",
};

const wraper = mount(
   <Provider store={store}>
      <JornalEntry {...note} />
   </Provider>
);

// *****************************************************

describe("pruebas en <JornalEntry/>", () => {
   // -------------------------------------------
   test("debe de mostrarse correctamente", () => {
      expect(wraper).toMatchSnapshot();
   });
   // -------------------------------------------
   test("debe de activar la nota", () => {
      wraper.find(".journal__entry").prop("onClick")();
      expect(store.dispatch).toHaveBeenCalledWith(
         activeNote(note.id, { ...note })
      );
   });
   // -------------------------------------------
});
