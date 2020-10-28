import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import {
   login,
   logout,
   startLogoud,
   startLoginEmailPassword,
} from "../../actions/auth";
import { types } from "../../types/types";
// ************************************************

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

// ************************************************
describe("preubas con las acciones de auth", () => {
   beforeEach(() => {
      store = mockStore(initState);
   });

   // ------------------------------------------------------------
   test("login y logout deben de crear las acciones respectivas", () => {
      const user = {
         type: types.login,
         payload: {
            uid: "123",
            displayName: "gerardo",
         },
      };

      const loginAction = login("123", "gerardo");
      const logoutAction = logout();

      expect(loginAction).toEqual(user);
      expect(logoutAction).toEqual({
         type: types.logout,
      });
   });

   //    --------------------------------------------------------
   test("debe de realizar el startLogoud", async () => {
      await store.dispatch(startLogoud());
      const actions = store.getActions();

      expect(actions[0]).toEqual({
         type: types.logout,
      });
      expect(actions[1]).toEqual({
         type: types.notesLogoutCleaning,
      });
   });

   //    --------------------------------------------------------
   test("debe iniciar el startLoginEmailPassword", async () => {
      await store.dispatch(
         startLoginEmailPassword(
            "test@testing.com",
            "123456"
         )
      );
      const actions = store.getActions();

      expect(actions[1]).toEqual({
         type: types.login,
         payload: {
            uid: expect.any(String),
            displayName: null,
         },
      });
   });
   //    --------------------------------------------------------
});
