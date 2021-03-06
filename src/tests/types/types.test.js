import "@testing-library/jest-dom";
import { types } from "../../types/types";

describe("pruebas en los types ", () => {
   const typesPrueba = {
      login: "[Auth] Login",
      logout: "[Auth] Logout",

      uiSetError: "[UI] Set Error",
      uiRemoveError: "[UI] Remove Error",

      uiStartLoading: "[UI] Start loading",
      uiFinishLoading: "[UI] Finish loading",

      notesAddNew: "[Notes] New note",
      notesActive: "[Notes] set active note",
      notesLoad: "[Notes] Load notes",
      notesUpdate: "[Notes] Update note",
      notesFileUrl: "[Notes] Update image url",
      notesDelete: "[Notes] Delete note",
      notesLogoutCleaning: "[Notes] Logout Cleaning",
   };

   test("debe de tener estos types", () => {
      expect(types).toEqual(typesPrueba);
   });
});
