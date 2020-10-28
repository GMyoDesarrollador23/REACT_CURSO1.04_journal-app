import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import { db } from "../../firebase/firebase-config";
import { types } from "../../types/types";
import {
   startNewNote,
   startLoadingNotes,
   startSaveNote,
   startUploading,
} from "../../actions/notes";

// *************************************************************
jest.mock("../../helpers/fileUpload", () => ({
   fileUpload: jest.fn(() => {
      return "https://hola-mundo/cosas";
      // return Promise.resolve("https://hola-mundo/cosas");
   }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
   auth: {
      uid: "TESTING",
   },
   notes: {
      active: {
         id: "Crn6axAwmMfgyWzgmD46",
         title: "hola",
         body: "mundo",
      },
   },
};
let store = mockStore(initState);

// ***************************************************************
describe("Pruebas con las acciones de notes", () => {
   // --------------------------------------------------

   beforeEach(() => {
      store = mockStore(initState);
   });

   // --------------------------------------------------
   test("pruebas en el startNewNotes", async () => {
      await store.dispatch(startNewNote());

      const actions = store.getActions();
      expect(actions[0]).toEqual({
         type: types.notesActive,
         payload: {
            id: expect.any(String),
            title: "",
            body: "",
            date: expect.any(Number),
         },
      });
      expect(actions[1]).toEqual({
         type: types.notesAddNew,
         payload: {
            id: expect.any(String),
            title: "",
            body: "",
            date: expect.any(Number),
         },
      });

      const docId = actions[1].payload.id;
      await db
         .doc(`TESTING/journal/notes/${docId}`)
         .delete();
   });

   // --------------------------------------------------
   test("startLoading Note debe cargar las notas", async () => {
      await store.dispatch(startLoadingNotes("TESTING"));

      const actions = store.getActions();
      // console.log(actions[0]);

      expect(actions[0]).toEqual({
         type: types.notesLoad,
         payload: expect.any(Array),
      });

      const expected = {
         id: expect.any(String),
         title: expect.any(String),
         body: expect.any(String),
         date: expect.any(Number),
      };

      expect(actions[0].payload[0]).toMatchObject(expected);
   });

   // --------------------------------------------------
   test("startSaveNote debe actualizar la nota", async () => {
      const note = {
         id: "Crn6axAwmMfgyWzgmD46",
         title: "titulo",
         body: "body",
      };

      await store.dispatch(startSaveNote(note));

      const actions = store.getActions();

      const docRef = await db
         .doc(`/TESTING/journal/notes/${note.id}`)
         .get();

      expect(actions[0].payload).toEqual({
         id: expect.any(String),
         note: expect.any(Object),
      });

      expect(docRef.data().title).toBe(note.title);
      expect(docRef.data().body).toBe(note.body);
   });

   // --------------------------------------------------
   test("startUploading debe actualizar el entry", async () => {
      const file = new File([], "cualquierFoto.png");

      await store.dispatch(startUploading(file));

      const docRef = await db
         .doc("/TESTING/journal/notes/Crn6axAwmMfgyWzgmD46")
         .get();
      expect(docRef.data().url).toBe(
         "https://hola-mundo/cosas"
      );
   });
});
