import "@testing-library/jest-dom";

import { types } from "../../types/types";
import { authReducer } from "../../reducers/authReducer";
// ******************************************************

describe("Pruebas en el authReducers", () => {

   // -------------------------------------------------
   test("prebas en types.login", () => {
      const action = {
         type: types.login,
         payload: {
            uid: "12345",
            displayName: "Gerardo",
         },
      };
      expect(authReducer({}, action)).toEqual({
         uid: "12345",
         name: "Gerardo",
      });
   });

   // -------------------------------------------------
   test("prebas en types.logout", () => {
      const action = {
         type: types.logout,
      };
      expect(authReducer({ algo: 1 }, action)).toEqual({});
   });

   // -------------------------------------------------
   test("prebas por defecto", () => {
      const action = {
         type: types.algo,
      };
      expect(
         authReducer({ algo: "esto es una prueba" }, action)
      ).toEqual({ algo: "esto es una prueba" });
   });
   
   // -------------------------------------------------
});
